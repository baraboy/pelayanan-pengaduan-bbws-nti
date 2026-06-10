import JenisKelaminChart from "../components/jenis-kelamin-chart"
import PendidikanChart from "../components/pendidikan-chart"
import SurveyChart from "../components/survey-chart"
import axios from "../libs/axios"
import { useEffect, useState } from "react"
import UsiaChart from "../components/usia-chart"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis, LabelList, Line, LineChart } from "recharts"

type DataAvr = {
    kesesuaian_persyaratan: number,
    kesesuaian_pelayanan: number,
    kemudahan_prosedur: number,
    kecepatan_pelayanan: number,
    kewajaran_biaya: number,
    kemampuan_petugas: number,
    perilaku_petugas: number,
    kualitas_sarana: number,
    penanganan_pengaduan: number,
}

const indicatorLabels: Record<keyof DataAvr, string> = {
    kesesuaian_persyaratan: "Kesesuaian Persyaratan",
    kesesuaian_pelayanan: "Kesesuaian Pelayanan",
    kemudahan_prosedur: "Kemudahan Prosedur",
    kecepatan_pelayanan: "Kecepatan Pelayanan",
    kewajaran_biaya: "Kewajaran Biaya",
    kemampuan_petugas: "Kemampuan Petugas",
    perilaku_petugas: "Perilaku Petugas",
    kualitas_sarana: "Kualitas Sarana",
    penanganan_pengaduan: "Penanganan Pengaduan",
};

const indicatorKeys = Object.keys(indicatorLabels) as Array<keyof DataAvr>;
const trendBarColors = ["#1D4ED8", "#0EA5E9", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#14B8A6", "#F97316", "#6366F1"];

type TrendViewMode = 'indicators' | 'ikm';

const IKM_COLOR = "#DC2626"; // Red color for IKM

const getMutuLabel = (ikm: number): string => {
    if (ikm >= 81.26) return 'A';
    if (ikm >= 62.51) return 'B';
    if (ikm >= 43.76) return 'C';
    return 'D';
};

const getMutuDescription = (mutu: string): string => {
    switch (mutu) {
        case 'A': return 'Sangat Puas';
        case 'B': return 'Puas';
        case 'C': return 'Kurang Puas';
        case 'D': return 'Tidak Puas';
        default: return '';
    }
};

// Ini perhitungan triwulan normal
// const monthToTM = (): string => {
//     const d = new Date();
//     let month = d.getMonth();

//     if (month == 1 || month == 2 || month == 3) {
//         return "1";
//     } else if (month == 4 || month == 5 || month == 6) {
//         return "2";
//     } else if (month == 7 || month == 8 || month == 8) {
//         return "3";
//     } else if (month == 9 || month == 11 || month == 12) {
//         return "4";
//     }

//     return "0";
// }

type PeriodOption = {
    value: string;
    label: string;
    year: number;
    type: "quarter" | "semester";
    tm: string;
    start: Date;
    end: Date;
};

const startOfDay = (year: number, month: number, day: number) =>
    new Date(year, month - 1, day, 0, 0, 0, 0);

const endOfDay = (year: number, month: number, day: number) =>
    new Date(year, month - 1, day, 23, 59, 59, 999);

const parseItemDate = (value: any): Date | null => {
    if (!value) return null;
    if (value instanceof Date) return value;
    if (typeof value === "number") return new Date(value);
    if (typeof value === "string") {
        const match = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
        if (match) {
            const year = Number(match[1]);
            const month = Number(match[2]);
            const day = Number(match[3]);
            return new Date(year, month - 1, day, 0, 0, 0, 0);
        }
        const parsed = new Date(value);
        return Number.isNaN(parsed.getTime()) ? null : parsed;
    }
    return null;
};

const filterDataByRange = (data: any[], start: Date, end: Date) => {
    if (!Array.isArray(data) || data.length === 0) return [];

    return data.filter((item) => {
        const dateValue = parseItemDate(item?.created_at);
        if (!dateValue) return false;
        return dateValue >= start && dateValue <= end;
    });
};

const averageIndicators = (data: any[]): DataAvr => {
    const initial: DataAvr = {
        kesesuaian_persyaratan: 0,
        kesesuaian_pelayanan: 0,
        kemudahan_prosedur: 0,
        kecepatan_pelayanan: 0,
        kewajaran_biaya: 0,
        kemampuan_petugas: 0,
        perilaku_petugas: 0,
        kualitas_sarana: 0,
        penanganan_pengaduan: 0,
    };

    if (!Array.isArray(data) || data.length === 0) return initial;

    for (let i = 0; i < data.length; i++) {
        initial.kecepatan_pelayanan += Number(data[i].kecepatan_pelayanan || 0)
        initial.kemampuan_petugas += Number(data[i].kemampuan_petugas || 0)
        initial.kemudahan_prosedur += Number(data[i].kemudahan_prosedur || 0)
        initial.kesesuaian_pelayanan += Number(data[i].kesesuaian_pelayanan || 0)
        initial.kesesuaian_persyaratan += Number(data[i].kesesuaian_persyaratan || 0)
        initial.kewajaran_biaya += Number(data[i].kewajaran_biaya || 0)
        initial.kualitas_sarana += Number(data[i].kualitas_sarana || 0)
        initial.penanganan_pengaduan += Number(data[i].penanganan_pengaduan || 0)
        initial.perilaku_petugas += Number(data[i].perilaku_petugas || 0)
    }

    indicatorKeys.forEach((key) => {
        initial[key] = Number((initial[key] / data.length).toFixed(2));
    });

    return initial;
}

export default function RekapData() {
    const now = new Date();
    const periodOptions: PeriodOption[] = [
        {
            value: "2024-q2",
            label: "Triwulan II (2024)",
            year: 2024,
            type: "quarter",
            tm: "2",
            start: startOfDay(2024, 4, 1),
            end: endOfDay(2024, 6, 30),
        },
        {
            value: "2024-q3",
            label: "Triwulan III (2024)",
            year: 2024,
            type: "quarter",
            tm: "3",
            start: startOfDay(2024, 7, 1),
            end: endOfDay(2024, 9, 30),
        },
        {
            value: "2024-q4",
            label: "Triwulan IV (2024)",
            year: 2024,
            type: "quarter",
            tm: "4",
            start: startOfDay(2024, 10, 1),
            end: endOfDay(2024, 12, 31),
        },
        {
            value: "2025-q1",
            label: "Triwulan I (2025)",
            year: 2025,
            type: "quarter",
            tm: "1",
            start: startOfDay(2025, 1, 1),
            end: endOfDay(2025, 3, 31),
        },
        {
            value: "2025-q2",
            label: "Triwulan II (2025)",
            year: 2025,
            type: "quarter",
            tm: "2",
            start: startOfDay(2025, 4, 1),
            end: endOfDay(2025, 6, 9),
        },
        {
            value: "2025-q3",
            label: "Triwulan III (2025)",
            year: 2025,
            type: "quarter",
            tm: "3",
            start: startOfDay(2025, 6, 10),
            end: endOfDay(2025, 9, 9),
        },
        {
            value: "2025-q4",
            label: "Triwulan IV (2025)",
            year: 2025,
            type: "quarter",
            tm: "4",
            start: startOfDay(2025, 9, 10),
            end: endOfDay(2025, 12, 9),
        },
        {
            value: "2026-s1",
            label: "Semester I (2026)",
            year: 2026,
            type: "semester",
            tm: "1",
            start: startOfDay(2025, 12, 10),
            end: endOfDay(2026, 6, 9),
        },
        {
            value: "2026-s2",
            label: "Semester II (2026)",
            year: 2026,
            type: "semester",
            tm: "2",
            start: startOfDay(2026, 6, 10),
            end: endOfDay(2026, 12, 9),
        },
    ];

    const availablePeriodOptions = periodOptions.filter((option) => option.start <= now);
    const defaultPeriodValue =
        availablePeriodOptions.find((option) => now >= option.start && now <= option.end)?.value ||
        availablePeriodOptions[0]?.value ||
        periodOptions[0].value;

    const [selectedPeriod, setSelectedPeriod] = useState(defaultPeriodValue);
    const [isLoading, setIsLoading] = useState(false)
    const [avgData, setAvgData] = useState<DataAvr>()
    const [avrTetimbangData, setAvrTetimbangData] = useState<DataAvr>()
    const [ikmData, setIkmData] = useState(0)
    const [chartData, setChartData] = useState<any>([])

    const [laki, setLaki] = useState(0)
    const [perempuan, setPerempuan] = useState(0)

    const [sd, setSd] = useState(0)
    const [smp, setSmp] = useState(0)
    const [sma, setSma] = useState(0)
    const [s1, setS1] = useState(0)
    const [s2, setS2] = useState(0)
    const [s3, setS3] = useState(0)

    const [usia1, setUsia1] = useState(0)
    const [usia2, setUsia2] = useState(0)
    const [usia3, setUsia3] = useState(0)
    const [usia4, setUsia4] = useState(0)
    const [usia5, setUsia5] = useState(0)
    const [usia6, setUsia6] = useState(0)

    const [pekerjaan1, setPekerjaan1] = useState(0)
    const [pekerjaan2, setPekerjaan2] = useState(0)
    const [pekerjaan3, setPekerjaan3] = useState(0)
    const [pekerjaan4, setPekerjaan4] = useState(0)
    const [pekerjaan5, setPekerjaan5] = useState(0)
    const [pekerjaan6, setPekerjaan6] = useState(0)
    const [pekerjaan7, setPekerjaan7] = useState(0)
    const [pekerjaan8, setPekerjaan8] = useState(0)
    const [pekerjaan9, setPekerjaan9] = useState(0)
    const [pekerjaan10, setPekerjaan10] = useState(0)

    const [pelayanan1, setPelayanan1] = useState(0)
    const [pelayanan2, setPelayanan2] = useState(0)
    const [pelayanan3, setPelayanan3] = useState(0)
    const [pelayanan4, setPelayanan4] = useState(0)
    const [pelayanan5, setPelayanan5] = useState(0)
    const [pelayanan6, setPelayanan6] = useState(0)
    const [pelayanan7, setPelayanan7] = useState(0)

    const [genderChartData, setGenderChartData] = useState<any>([])
    const [pendidikanChartData, setPendidikanChartData] = useState<any>([])
    const [usiaChartData, setUsiaChartData] = useState<any>([])
    const [pekerjaanChartData, setPekerjaanChartData] = useState<any>([])
    const [pelayananChartData, setPelayananChartData] = useState<any>([])
    const [trendData, setTrendData] = useState<any[]>([])
    const [isTrendLoading, setIsTrendLoading] = useState(false)
    const [selectedIndicators, setSelectedIndicators] = useState<Array<keyof DataAvr>>(indicatorKeys)
    const [trendViewMode, setTrendViewMode] = useState<TrendViewMode>('indicators')
    const [ikmChartType, setIkmChartType] = useState<'bar' | 'line'>('bar')

    useEffect(() => {
        fetAllSurvey()
    }, [])

    useEffect(() => {
        fetchTrendByPeriod()
    }, [])

    useEffect(() => {
        fetAllSurvey()
    }, [selectedPeriod])

    const fetAllSurvey = async () => {
        setIsLoading(true)
        try {
            const period = availablePeriodOptions.find((option) => option.value === selectedPeriod) || availablePeriodOptions[0];
            if (!period) return;
            const headers = {
                headers: {
                    'Authorization': 'Basic c3VydmV5c2lzZGE6cGFzczJzaXNkYXN1cnZleQ=='
                }
            };

            const res = await axios.get(`/api/survey?all=true&trismester=${period.tm}&year=${period.year}`, headers)
            const filtered = filterDataByRange(res.data?.data || [], period.start, period.end);
            console.log('response rekap', filtered)
            itemAverage(filtered)
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const fetchTrendByPeriod = async () => {
        setIsTrendLoading(true)
        try {
            const headers = {
                headers: {
                    'Authorization': 'Basic c3VydmV5c2lzZGE6cGFzczJzaXNkYXN1cnZleQ=='
                }
            };

            const responses = await Promise.all(
                availablePeriodOptions.map(async (period) => {
                    const res = await axios.get(`/api/survey?all=true&trismester=${period.tm}&year=${period.year}`, headers)
                    const filtered = filterDataByRange(res.data?.data || [], period.start, period.end)
                    const averages = averageIndicators(filtered)

                    // Calculate IKM for this period
                    const keys = Object.keys(averages) as Array<keyof DataAvr>;
                    let totalWeighted = 0;
                    keys.forEach((key) => {
                        totalWeighted += averages[key] / keys.length;
                    });
                    const ikm = totalWeighted * 25;
                    const mutu = getMutuLabel(ikm);

                    return {
                        period: period.label,
                        ...averages,
                        ikm: Number(ikm.toFixed(2)),
                        mutu: mutu
                    }
                })
            )

            setTrendData(responses)
        } catch (error) {
            console.error(error)
        } finally {
            setIsTrendLoading(false)
        }
    }

    const itemAverage = (data: any) => {
        let avr: DataAvr = {
            kesesuaian_persyaratan: 0,
            kesesuaian_pelayanan: 0,
            kemudahan_prosedur: 0,
            kecepatan_pelayanan: 0,
            kewajaran_biaya: 0,
            kemampuan_petugas: 0,
            perilaku_petugas: 0,
            kualitas_sarana: 0,
            penanganan_pengaduan: 0,
        }

        let avrTertimbang: DataAvr = {
            kesesuaian_persyaratan: 0,
            kesesuaian_pelayanan: 0,
            kemudahan_prosedur: 0,
            kecepatan_pelayanan: 0,
            kewajaran_biaya: 0,
            kemampuan_petugas: 0,
            perilaku_petugas: 0,
            kualitas_sarana: 0,
            penanganan_pengaduan: 0,
        }

        // jenis kelamin
        let lk = 0
        let pr = 0

        // pendidikan
        let msd = 0
        let msmp = 0
        let msma = 0
        let ms1 = 0
        let ms2 = 0
        let ms3 = 0

        // usia
        let usia_1 = 0
        let usia_2 = 0
        let usia_3 = 0
        let usia_4 = 0
        let usia_5 = 0
        let usia_6 = 0

        // pekerjaan
        let pekerjaan_1 = 0
        let pekerjaan_2 = 0
        let pekerjaan_3 = 0
        let pekerjaan_4 = 0
        let pekerjaan_5 = 0
        let pekerjaan_6 = 0
        let pekerjaan_7 = 0
        let pekerjaan_8 = 0
        let pekerjaan_9 = 0
        let pekerjaan_10 = 0

        // pelayanan
        let pelayanan_1 = 0
        let pelayanan_2 = 0
        let pelayanan_3 = 0
        let pelayanan_4 = 0
        let pelayanan_5 = 0
        let pelayanan_6 = 0
        let pelayanan_7 = 0

        for (let i = 0; i < data.length; i++) {
            avr.kecepatan_pelayanan += data[i].kecepatan_pelayanan
            avr.kemampuan_petugas += data[i].kemampuan_petugas
            avr.kemudahan_prosedur += data[i].kemudahan_prosedur
            avr.kesesuaian_pelayanan += data[i].kesesuaian_pelayanan
            avr.kesesuaian_persyaratan += data[i].kesesuaian_persyaratan
            avr.kewajaran_biaya += data[i].kewajaran_biaya
            avr.kualitas_sarana += data[i].kualitas_sarana
            avr.penanganan_pengaduan += data[i].penanganan_pengaduan
            avr.perilaku_petugas += data[i].perilaku_petugas

            if (data[i].jenis_kelamin == "Laki - Laki") {
                lk += 1
            }

            if (data[i].jenis_kelamin == "Perempuan") {
                pr += 1
            }

            if (data[i].pendidikan == "SD") {
                msd += 1
            }

            if (data[i].pendidikan == "SMP") {
                msmp += 1
            }

            if (data[i].pendidikan == "SMA") {
                msma += 1
            }

            if (data[i].pendidikan == "S1") {
                ms1 += 1
            }

            if (data[i].pendidikan == "S2") {
                ms2 += 1
            }

            if (data[i].pendidikan == "S3") {
                ms3 += 1
            }

            if (data[i].usia == "Kurang dari 18 tahun") {
                usia_1 += 1
            }

            if (data[i].usia == "18 s.d 25 tahun") {
                usia_2 += 1
            }

            if (data[i].usia == "26 s.d 35 tahun") {
                usia_3 += 1
            }

            if (data[i].usia == "36 s.d 45 tahun") {
                usia_4 += 1
            }

            if (data[i].usia == "46 s.d 55 tahun") {
                usia_5 += 1
            }

            if (data[i].usia == "Lebih dari 56 tahun") {
                usia_6 += 1
            }

            // pekerjaan
            if (data[i].pekerjaan == "Pelajar/Mahasiswa") {
                pekerjaan_1 += 1
            }

            if (data[i].pekerjaan == "Guru/Dosen") {
                pekerjaan_2 += 1
            }

            if (data[i].pekerjaan == "ASN") {
                pekerjaan_3 += 1
            }

            if (data[i].pekerjaan == "Karyawan Swasta") {
                pekerjaan_4 += 1
            }

            if (data[i].pekerjaan == "Karyawan BUMN") {
                pekerjaan_5 += 1
            }

            if (data[i].pekerjaan == "Petani") {
                pekerjaan_6 += 1
            }

            if (data[i].pekerjaan == "Nelayan") {
                pekerjaan_7 += 1
            }

            if (data[i].pekerjaan == "Freelancer") {
                pekerjaan_8 += 1
            }

            if (data[i].pekerjaan == "Tidak Bekerja") {
                pekerjaan_9 += 1
            }

            if (
                data[i].pekerjaan != "Pelajar/Mahasiswa"
                && data[i].pekerjaan != "Guru/Dosen"
                && data[i].pekerjaan != "ASN"
                && data[i].pekerjaan != "Karyawan Swasta"
                && data[i].pekerjaan != "Karyawan BUMN"
                && data[i].pekerjaan != "Petani"
                && data[i].pekerjaan != "Nelayan"
                && data[i].pekerjaan != "Freelancer"
                && data[i].pekerjaan != "Tidak Bekerja"
                && data[i].pekerjaan != "Guru/Dosen"
            ) {
                pekerjaan_10 += 1
            }

            if (data[i].jenis_pelayanan == "Pelayanan Permohonan Informasi Publik dan Pengaduan") {
                pelayanan_1 += 1
            }

            if (data[i].jenis_pelayanan == "Pelayanan Rekomendasi Teknis") {
                pelayanan_2 += 1
            }

            if (data[i].jenis_pelayanan == "Pelayanan Unit Alokasi Air") {
                pelayanan_3 += 1
            }

            if (data[i].jenis_pelayanan == "Pelayanan Penanggulangan Banjir dan Bencana") {
                pelayanan_4 += 1
            }

            if (data[i].jenis_pelayanan == "Pelayanan Hidrologi dan Kualitas Air") {
                pelayanan_5 += 1
            }

            if (data[i].jenis_pelayanan == "Pelayanan Pengujian Laboratorium") {
                pelayanan_6 += 1
            }

            if (data[i].jenis_pelayanan != "Pelayanan Permohonan Informasi Publik dan Pengaduan" &&
                data[i].jenis_pelayanan != "Pelayanan Rekomendasi Teknis" &&
                data[i].jenis_pelayanan != "Pelayanan Unit Alokasi Air" &&
                data[i].jenis_pelayanan != "Pelayanan Penanggulangan Banjir dan Bencana" &&
                data[i].jenis_pelayanan != "Pelayanan Hidrologi dan Kualitas Air" &&
                data[i].jenis_pelayanan != "Pelayanan Pengujian Laboratorium" &&
                data[i].jenis_pelayanan != "Pelayanan Permohonan Informasi Publik dan Pengaduan"
            ) {
                pelayanan_7 += 1
            }
        }

        setLaki(lk)
        setPerempuan(pr)
        setSd(msd)
        setSmp(msmp)
        setSma(msma)
        setS1(ms1)
        setS2(ms2)
        setS3(ms3)

        setUsia1(usia_1)
        setUsia2(usia_2)
        setUsia3(usia_3)
        setUsia4(usia_4)
        setUsia5(usia_5)
        setUsia6(usia_6)

        setPekerjaan1(pekerjaan_1)
        setPekerjaan2(pekerjaan_2)
        setPekerjaan3(pekerjaan_3)
        setPekerjaan4(pekerjaan_4)
        setPekerjaan5(pekerjaan_5)
        setPekerjaan6(pekerjaan_6)
        setPekerjaan7(pekerjaan_7)
        setPekerjaan8(pekerjaan_8)
        setPekerjaan9(pekerjaan_9)
        setPekerjaan10(pekerjaan_10)

        setPelayanan1(pelayanan_1)
        setPelayanan2(pelayanan_2)
        setPelayanan3(pelayanan_3)
        setPelayanan4(pelayanan_4)
        setPelayanan5(pelayanan_5)
        setPelayanan6(pelayanan_6)
        setPelayanan7(pelayanan_7)

        setGenderChartData([
            {
                "name": "Laki-Laki",
                "value": lk
            },
            {
                "name": "Perempuan",
                "value": pr
            }
        ])

        setPendidikanChartData([
            {
                "name": "SD/MI",
                "value": msd
            },
            {
                "name": "SMP/MTS",
                "value": msmp
            },
            {
                "name": "SMA/SLTA/MA/SMK",
                "value": msma
            },
            {
                "name": "S1",
                "value": ms1
            },
            {
                "name": "S2",
                "value": ms2
            },
            {
                "name": "S3",
                "value": ms3
            },
        ])

        setUsiaChartData([
            {
                "name": "Kurang dari 18 tahun",
                "value": usia_1
            },
            {
                "name": "18 s.d 25 tahun",
                "value": usia_2
            },
            {
                "name": "26 s.d 35 tahun",
                "value": usia_3
            },
            {
                "name": "36 s.d 45 tahun",
                "value": usia_4
            },
            {
                "name": "46 s.d 55 tahun",
                "value": usia_5
            },
            {
                "name": "Lebih dari 56 tahun",
                "value": usia_6
            },
        ])

        setPekerjaanChartData([
            {
                "name": "Pelajar/Mahasiswa",
                "value": pekerjaan_1
            },
            {
                "name": "Guru/Dosen",
                "value": pekerjaan_2
            },
            {
                "name": "ASN",
                "value": pekerjaan_3
            },
            {
                "name": "Karyawan Swasta",
                "value": pekerjaan_4
            },
            {
                "name": "Karyawan BUMN",
                "value": pekerjaan_5
            },
            {
                "name": "Petani",
                "value": pekerjaan_6
            },
            {
                "name": "Nelayan",
                "value": pekerjaan_7
            },
            {
                "name": "Freelancer",
                "value": pekerjaan_8
            },
            {
                "name": "Tidak Bekerja",
                "value": pekerjaan_9
            },
            {
                "name": "Lainnya",
                "value": pekerjaan_10
            },
        ])

        setPelayananChartData([
            {
                "name": "Pelayanan Permohonan Informasi Publik dan Pengaduan",
                "value": pelayanan_1
            },
            {
                "name": "Pelayanan Rekomendasi Teknis",
                "value": pelayanan_2
            },
            {
                "name": "Pelayanan Unit Alokasi Air",
                "value": pelayanan_3
            },
            {
                "name": "Pelayanan Penanggulangan Banjir dan Bencana",
                "value": pelayanan_4
            },
            {
                "name": "Pelayanan Hidrologi dan Kualitas Air",
                "value": pelayanan_5
            },
            {
                "name": "Pelayanan Pengujian Laboratorium",
                "value": pelayanan_6
            },
            {
                "name": "Lainnya",
                "value": pelayanan_7
            },
        ])

        const keys = Object.keys(avr) as Array<keyof typeof avr>;

        let mikm = 0
        let mChartData: any = []

        keys.forEach((k) => {
            avr[k] = data.length > 0 ? avr[k] / data.length : 0;
            avrTertimbang[k] = 1 / keys.length * avr[k]
            mikm += avrTertimbang[k]

            mChartData.push({
                name: k.replace(/_/g, " "),
                nilai: avr[k].toFixed(2)
            })
        })

        console.log('average', avr)
        setAvgData(avr)
        setAvrTetimbangData(avrTertimbang)
        setIkmData(mikm * 25)
        setChartData(mChartData)
    }

    const toggleIndicator = (indicator: keyof DataAvr) => {
        setSelectedIndicators((prev) => {
            if (prev.includes(indicator)) {
                return prev.filter((item) => item !== indicator);
            }
            return [...prev, indicator];
        });
    }

    const mutuPelyanan = (ikm: number) => {
        if (ikm >= 0) {
            if (ikm <= 43.75) {
                return "D"
            } else if (ikm >= 43.76 && ikm <= 62.50) {
                return "C"
            } else if (ikm >= 62.51 && ikm <= 81.25) {
                return "B"
            } else if (ikm >= 81.26 && ikm <= 100.75) {
                return "A"
            }
        }

        return "D"
    }

    const kinerjaPelayanan = (mutu: string) => {
        if (mutu == "A") {
            return "SANGAT PUAS"
        } else if (mutu == "B") {
            return "PUAS"
        } else if (mutu == "C") {
            return "KURANG PUAS"
        } else {
            return "TIDAK PUAS"
        }
    }



    return (
        <div className="max-w-7xl mx-auto px-4 mt-8">
            <div className="border rounded-lg p-4 mb-8 bg-white">
                <div className="font-semibold text-lg">Tren Kepuasan Masyarakat</div>
                <div className="text-sm text-gray-600 mt-1">Periode: TW II 2024 s.d Semester II 2026</div>

                {/* Toggle View Mode */}
                <div className="mt-4 flex flex-wrap gap-2">
                    <div className="inline-flex rounded-md shadow-sm" role="group">
                        <button
                            type="button"
                            className={`px-4 py-2 text-sm font-medium rounded-l-lg ${trendViewMode === 'indicators'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                                }`}
                            onClick={() => setTrendViewMode('indicators')}
                        >
                            Rincian
                        </button>
                        <button
                            type="button"
                            className={`px-4 py-2 text-sm font-medium rounded-r-lg ${trendViewMode === 'ikm'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 border-l-0'
                                }`}
                            onClick={() => setTrendViewMode('ikm')}
                        >
                            Kesimpulan
                        </button>
                    </div>
                    <span className="text-sm text-gray-500 self-center ml-2">
                        {trendViewMode === 'indicators'
                            ? '9 indikator penilaian yang menyusun nilai IKM'
                            : 'Nilai IKM menggambarkan kepuasan masyarakat secara keseluruhan'}
                    </span>
                </div>

                {trendViewMode === 'indicators' && (
                    <>
                        <div className="mt-4 flex flex-wrap gap-2">
                            <button
                                type="button"
                                className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-500"
                                onClick={() => setSelectedIndicators(indicatorKeys)}
                            >
                                Pilih Semua
                            </button>
                            <button
                                type="button"
                                className="rounded-md border px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                onClick={() => setSelectedIndicators([])}
                            >
                                Reset
                            </button>
                        </div>
                        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                            {indicatorKeys.map((key) => (
                                <label key={key} className="inline-flex items-center gap-2 text-sm text-gray-700">
                                    <input
                                        type="checkbox"
                                        checked={selectedIndicators.includes(key)}
                                        onChange={() => toggleIndicator(key)}
                                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    {indicatorLabels[key]}
                                </label>
                            ))}
                        </div>
                    </>
                )}

                {isTrendLoading ? (
                    <div className="w-full p-8 text-center">Loading grafik tren...</div>
                ) : trendViewMode === 'indicators' && selectedIndicators.length === 0 ? (
                    <div className="w-full p-8 text-center text-gray-600">Belum ada indikator dipilih. Klik `Pilih Semua` atau centang indikator yang ingin ditampilkan.</div>
                ) : (
                    <div className="w-full overflow-x-auto mt-4">
                        <div className={trendViewMode === 'ikm' ? 'w-full h-[400px]' : 'min-w-[1300px] h-[430px]'}>
                            <ResponsiveContainer width="100%" height="100%">
                                {trendViewMode === 'ikm' && ikmChartType === 'line' ? (
                                    <LineChart data={trendData} margin={{ top: 12, right: 20, left: 0, bottom: 80 }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="period" interval={0} angle={-20} textAnchor="end" height={90} fontSize={12} />
                                        <YAxis domain={[0, 100]} fontSize={12} label={{ value: 'Nilai IKM', angle: -90, position: 'insideLeft' }} />
                                        <Tooltip
                                            formatter={(value: any, name: string, props: any) => {
                                                const mutu = props.payload?.mutu;
                                                const mutuDesc = getMutuDescription(mutu);
                                                return [`${value} (Mutu ${mutu} - ${mutuDesc})`, 'IKM'];
                                            }}
                                        />
                                        <Legend />
                                        <Line
                                            type="monotone"
                                            dataKey="ikm"
                                            name="IKM"
                                            stroke={IKM_COLOR}
                                            strokeWidth={3}
                                            dot={{ fill: IKM_COLOR, strokeWidth: 2, r: 6 }}
                                            activeDot={{ r: 8 }}
                                        >
                                            <LabelList
                                                dataKey="ikm"
                                                position="top"
                                                formatter={(value: number) => `${value}`}
                                                style={{ fontSize: 12, fontWeight: 'bold' }}
                                            />
                                        </Line>
                                    </LineChart>
                                ) : (
                                    <BarChart data={trendData} margin={{ top: 12, right: 20, left: 0, bottom: 80 }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="period" interval={0} angle={-20} textAnchor="end" height={90} fontSize={12} />
                                        <YAxis
                                            domain={trendViewMode === 'ikm' ? [0, 100] : [0, 4]}
                                            fontSize={12}
                                            label={trendViewMode === 'ikm' ? { value: 'Nilai IKM', angle: -90, position: 'insideLeft' } : undefined}
                                        />
                                        <Tooltip
                                            formatter={(value: any, name: string, props: any) => {
                                                if (name === 'ikm') {
                                                    const mutu = props.payload?.mutu;
                                                    const mutuDesc = getMutuDescription(mutu);
                                                    return [`${value} (Mutu ${mutu} - ${mutuDesc})`, 'IKM'];
                                                }
                                                return [value, indicatorLabels[name as keyof DataAvr] || name];
                                            }}
                                        />
                                        <Legend />
                                        {trendViewMode === 'ikm' ? (
                                            <Bar
                                                dataKey="ikm"
                                                name="IKM"
                                                fill={IKM_COLOR}
                                                barSize={60}
                                            >
                                                <LabelList
                                                    dataKey="ikm"
                                                    position="top"
                                                    formatter={(value: number, entry: any) => {
                                                        const mutu = entry?.payload?.mutu;
                                                        return `${value} (${mutu})`;
                                                    }}
                                                    style={{ fontSize: 12, fontWeight: 'bold' }}
                                                />
                                            </Bar>
                                        ) : (
                                            selectedIndicators.map((key, index) => (
                                                <Bar key={key} dataKey={key} name={indicatorLabels[key]} fill={trendBarColors[index % trendBarColors.length]} />
                                            ))
                                        )}
                                    </BarChart>
                                )}
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}

                {trendViewMode === 'ikm' && (
                    <>
                        <div className="mt-4 flex items-center justify-between">
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => setIkmChartType('bar')}
                                    className={`px-3 py-1.5 text-sm rounded-md flex items-center gap-1.5 ${ikmChartType === 'bar'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                        }`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                    Batang
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIkmChartType('line')}
                                    className={`px-3 py-1.5 text-sm rounded-md flex items-center gap-1.5 ${ikmChartType === 'line'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                        }`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                                    </svg>
                                    Garis
                                </button>
                            </div>
                        </div>
                        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <div className="text-sm text-blue-800">
                                <span className="font-semibold">IKM (Indeks Kepuasan Masyarakat)</span> adalah nilai rata-rata tertimbang dari 9 indikator × 25.
                                <br />
                                Mutu pelayanan: <span className="font-semibold">A</span> (81.26-100), <span className="font-semibold">B</span> (62.51-81.25), <span className="font-semibold">C</span> (43.76-62.50), <span className="font-semibold">D</span> (0-43.75)
                            </div>
                        </div>
                    </>
                )}
            </div>

            <div className="flex justify-between">
                <h1 className="font-semibold text-3xl text-center uppercase">Survey Kepuasan Masyarakat</h1>

                <div>
                    <div className="sm:col-span-3">
                        {/* <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                            Trismester
                        </label> */}
                        <div className="mt-2">
                            <select
                                id="country"
                                name="country"
                                autoComplete="country-name"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                value={selectedPeriod}
                                onChange={(e) => {
                                    setSelectedPeriod(e.target.value)
                                }}
                            >
                                {availablePeriodOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            {isLoading &&
                <div className="w-full p-6 flex justify-center items-center">Loading Data...</div>
            }
            <div className="border rounded-lg mt-8">
                <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                        <tr className="divide-x">
                            <td className="px-4 py-2 text-center font-semibold"></td>
                            <td className="px-4 py-2 text-center font-semibold">Kesesuaian Persyaratan</td>
                            <td className="px-4 py-2 text-center font-semibold">Kesesuaian Pelayanan</td>
                            <td className="px-4 py-2 text-center font-semibold">Kemudahan Prosedur</td>
                            <td className="px-4 py-2 text-center font-semibold">Kecepatan Pelayanan</td>
                            <td className="px-4 py-2 text-center font-semibold">Kewajaran Biaya</td>
                            <td className="px-4 py-2 text-center font-semibold">Kemampuan Petugas</td>
                            <td className="px-4 py-2 text-center font-semibold">Perilaku Petugas</td>
                            <td className="px-4 py-2 text-center font-semibold">Kualitas Sarana</td>
                            <td className="px-4 py-2 text-center font-semibold">Penanganan Pengaduan</td>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        <tr className="divide-x">
                            <td className="px-4 py-2 text-left font-semibold">Nilai Rata-Rata</td>
                            <td className="px-4 py-2 text-center">{avgData?.kesesuaian_persyaratan.toFixed(2)}</td>
                            <td className="px-4 py-2 text-center">{avgData?.kesesuaian_pelayanan.toFixed(2)}</td>
                            <td className="px-4 py-2 text-center">{avgData?.kemudahan_prosedur.toFixed(2)}</td>
                            <td className="px-4 py-2 text-center">{avgData?.kecepatan_pelayanan.toFixed(2)}</td>
                            <td className="px-4 py-2 text-center">{avgData?.kewajaran_biaya.toFixed(2)}</td>
                            <td className="px-4 py-2 text-center">{avgData?.kemampuan_petugas.toFixed(2)}</td>
                            <td className="px-4 py-2 text-center">{avgData?.perilaku_petugas.toFixed(2)}</td>
                            <td className="px-4 py-2 text-center">{avgData?.kualitas_sarana.toFixed(2)}</td>
                            <td className="px-4 py-2 text-center">{avgData?.penanganan_pengaduan.toFixed(2)}</td>
                        </tr>
                        <tr className="divide-x">
                            <td className="px-4 py-2 text-left font-semibold">
                                Nilai rata-rata tertimbang (Nilai Bobot / Jumlah Indikator Penilaian)
                            </td>
                            <td className="px-4 py-2 text-center">{avrTetimbangData?.kesesuaian_persyaratan.toFixed(2)}</td>
                            <td className="px-4 py-2 text-center">{avrTetimbangData?.kesesuaian_pelayanan.toFixed(2)}</td>
                            <td className="px-4 py-2 text-center">{avrTetimbangData?.kemudahan_prosedur.toFixed(2)}</td>
                            <td className="px-4 py-2 text-center">{avrTetimbangData?.kecepatan_pelayanan.toFixed(2)}</td>
                            <td className="px-4 py-2 text-center">{avrTetimbangData?.kewajaran_biaya.toFixed(2)}</td>
                            <td className="px-4 py-2 text-center">{avrTetimbangData?.kemampuan_petugas.toFixed(2)}</td>
                            <td className="px-4 py-2 text-center">{avrTetimbangData?.perilaku_petugas.toFixed(2)}</td>
                            <td className="px-4 py-2 text-center">{avrTetimbangData?.kualitas_sarana.toFixed(2)}</td>
                            <td className="px-4 py-2 text-center">{avrTetimbangData?.penanganan_pengaduan.toFixed(2)}</td>
                        </tr>
                        <tr className="divide-x">
                            <td className="px-4 py-2 text-left font-semibold">
                                IKM (nilai rata2 tertimbang x 25)
                            </td>
                            <td colSpan={9} className="px-4 py-2 text-center font-semibold">{ikmData.toFixed(2)}</td>
                        </tr>
                        <tr className="divide-x">
                            <td className="px-4 py-2 text-left font-semibold">
                                Mutu Pelayanan
                            </td>
                            <td colSpan={9} className="px-4 py-2 text-center font-semibold">{mutuPelyanan(ikmData)}</td>
                        </tr>
                        <tr className="divide-x">
                            <td className="px-4 py-2 text-left font-semibold">
                                Kinerja Pelayanan
                            </td>
                            <td colSpan={9} className="px-4 py-2 text-center font-semibold">{kinerjaPelayanan(mutuPelyanan(ikmData))}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="w-full aspect-[6/2] mt-16">
                <SurveyChart data={chartData} />
            </div>

            <div className="w-full mt-16">
                <div className="border rounded-lg mt-8">
                    <table className="w-full text-sm">
                        <thead className="divide-y bg-gray-100">
                            <tr>
                                <th colSpan={14} className="px-4 py-2">Profile Responden</th>
                            </tr>
                            <tr className="divide-x">
                                <th colSpan={2} className="px-4 py-2">Jenis Kelamin</th>
                                <th colSpan={6} className="px-4 py-2">Pendidikan</th>
                                <th colSpan={6} className="px-4 py-2">Usia</th>
                            </tr>
                            <tr className="divide-x">
                                <th className="px-4 py-2 text-xs">Laki - Laki</th>
                                <th className="px-4 py-2 text-xs">Perempuan</th>
                                <th className="px-4 py-2 text-xs">SD</th>
                                <th className="px-4 py-2 text-xs">SMP</th>
                                <th className="px-4 py-2 text-xs">SMA</th>
                                <th className="px-4 py-2 text-xs">S1</th>
                                <th className="px-4 py-2 text-xs">S2</th>
                                <th className="px-4 py-2 text-xs">S3</th>
                                <th className="px-4 py-2 text-xs">Kurang dari 18 tahun</th>
                                <th className="px-4 py-2 text-xs">18 s.d 25 tahun</th>
                                <th className="px-4 py-2 text-xs">26 s.d 35 tahun</th>
                                <th className="px-4 py-2 text-xs">36 s.d 45 tahun</th>
                                <th className="px-4 py-2 text-xs">46 s.d 55 tahun</th>
                                <th className="px-4 py-2 text-xs">Lebih dari 56 tahun</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="divide-x">
                                <td className="text-center px-4 py-2">{laki}</td>
                                <td className="text-center px-4 py-2">{perempuan}</td>
                                <td className="text-center px-4 py-2">{sd}</td>
                                <td className="text-center px-4 py-2">{smp}</td>
                                <td className="text-center px-4 py-2">{sma}</td>
                                <td className="text-center px-4 py-2">{s1}</td>
                                <td className="text-center px-4 py-2">{s2}</td>
                                <td className="text-center px-4 py-2">{s3}</td>
                                <td className="text-center px-4 py-2">{usia1}</td>
                                <td className="text-center px-4 py-2">{usia2}</td>
                                <td className="text-center px-4 py-2">{usia3}</td>
                                <td className="text-center px-4 py-2">{usia4}</td>
                                <td className="text-center px-4 py-2">{usia5}</td>
                                <td className="text-center px-4 py-2">{usia6}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="w-full mt-8 grid grid-cols-3 gap-4">
                <div className="rounded-lg border p-4">
                    <div className="text-center font-semibold text-lg">Jenis Kelamin</div>
                    <div className="aspect-square">
                        <JenisKelaminChart data={genderChartData} />
                    </div>
                </div>

                <div className="rounded-lg border p-4">
                    <div className="text-center font-semibold text-lg">Pendidikan</div>
                    <div className="aspect-square">
                        <PendidikanChart data={pendidikanChartData} />
                    </div>
                </div>

                <div className="rounded-lg border p-4">
                    <div className="text-center font-semibold text-lg">Usia</div>
                    <div className="aspect-square">
                        <UsiaChart data={usiaChartData} />
                    </div>
                </div>

                {/* <div className="rounded-lg border p-4">
                    <div className="text-center font-semibold text-lg">Pekerjaan</div>
                    <div className="aspect-square">
                        <UsiaChart data={pekerjaanChartData} />
                    </div>
                </div> */}
            </div>

            <div className="w-full mt-16">
                <div className="border rounded-lg mt-8">
                    <table className="w-full text-sm">
                        <thead className="divide-y bg-gray-100">
                            <tr>
                                <th colSpan={10} className="px-4 py-2">Profile Responden</th>
                            </tr>
                            <tr className="divide-x">
                                <th colSpan={10} className="px-4 py-2">Pekerjaan</th>
                            </tr>
                            <tr className="divide-x">
                                <th className="px-4 py-2 text-xs">Pelajar / Mahasiswa</th>
                                <th className="px-4 py-2 text-xs">Guru / Dosen</th>
                                <th className="px-4 py-2 text-xs">ASN</th>
                                <th className="px-4 py-2 text-xs">Karyawan Swasta</th>
                                <th className="px-4 py-2 text-xs">Karyawan BUMN</th>
                                <th className="px-4 py-2 text-xs">Petani</th>
                                <th className="px-4 py-2 text-xs">Nelayan</th>
                                <th className="px-4 py-2 text-xs">Freelancer</th>
                                <th className="px-4 py-2 text-xs">Tidak Bekerja</th>
                                <th className="px-4 py-2 text-xs">Lainnya</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="divide-x">
                                <td className="text-center px-4 py-2">{pekerjaan1}</td>
                                <td className="text-center px-4 py-2">{pekerjaan2}</td>
                                <td className="text-center px-4 py-2">{pekerjaan3}</td>
                                <td className="text-center px-4 py-2">{pekerjaan4}</td>
                                <td className="text-center px-4 py-2">{pekerjaan5}</td>
                                <td className="text-center px-4 py-2">{pekerjaan6}</td>
                                <td className="text-center px-4 py-2">{pekerjaan7}</td>
                                <td className="text-center px-4 py-2">{pekerjaan8}</td>
                                <td className="text-center px-4 py-2">{pekerjaan9}</td>
                                <td className="text-center px-4 py-2">{pekerjaan10}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="w-full mt-8">
                <div className="border rounded-lg mt-8">
                    <table className="w-full text-sm">
                        <thead className="divide-y bg-gray-100">
                            <tr>
                                <th colSpan={8} className="px-4 py-2">Profile Responden</th>
                            </tr>
                            <tr className="divide-x">
                                <th colSpan={8} className="px-4 py-2">Jenis Pelayanan</th>
                            </tr>
                            <tr className="divide-x">
                                <th className="px-4 py-2 text-xs">Pelayanan Permohonan Informasi Publik dan Pengaduan</th>
                                <th className="px-4 py-2 text-xs">Pelayanan Rekomendasi Teknis</th>
                                <th className="px-4 py-2 text-xs">Pelayanan Unit Alokasi Air</th>
                                <th className="px-4 py-2 text-xs">Pelayanan Penanggulangan Banjir dan Bencana</th>
                                <th className="px-4 py-2 text-xs">Pelayanan Hidrologi dan Kualitas Air</th>
                                <th className="px-4 py-2 text-xs">Pelayanan Pengujian Laboratorium</th>
                                <th className="px-4 py-2 text-xs">Lainnya</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr className="divide-x">
                                <td className="text-center px-4 py-2">{pelayanan1}</td>
                                <td className="text-center px-4 py-2">{pelayanan2}</td>
                                <td className="text-center px-4 py-2">{pelayanan3}</td>
                                <td className="text-center px-4 py-2">{pelayanan4}</td>
                                <td className="text-center px-4 py-2">{pelayanan5}</td>
                                <td className="text-center px-4 py-2">{pelayanan6}</td>
                                <td className="text-center px-4 py-2">{pelayanan7}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="w-full mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-lg border p-4">
                    <div className="text-center font-semibold text-lg">Pekerjaan</div>
                    <div className="aspect-square">
                        <UsiaChart data={pekerjaanChartData} />
                    </div>
                </div>

                <div className="rounded-lg border p-4">
                    <div className="text-center font-semibold text-lg">Jenis Pelayanan</div>
                    <div className="aspect-square">
                        <UsiaChart data={pelayananChartData} />
                    </div>
                </div>
            </div>
        </div>
    )
}
