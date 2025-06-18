import { format } from "date-fns"
import JenisKelaminChart from "../components/jenis-kelamin-chart"
import PendidikanChart from "../components/pendidikan-chart"
import SurveyChart from "../components/survey-chart"
import axios from "../libs/axios"
import { useEffect, useState } from "react"
import UsiaChart from "../components/usia-chart"

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

// Ini perhitungan custom
const monthToTM = (): string => {
  const now = new Date();
  const year = now.getFullYear();

  const q1Start = new Date(`${year - 1}-12-10`);
  const q1End = new Date(`${year}-03-09`);

  const q2Start = new Date(`${year}-03-10`);
  const q2End = new Date(`${year}-06-09`);

  const q3Start = new Date(`${year}-06-10`);
  const q3End = new Date(`${year}-09-09`);

  const q4Start = new Date(`${year}-09-10`);
  const q4End = new Date(`${year}-12-09`);

  if (now >= q1Start && now <= q1End) return "1";
  if (now >= q2Start && now <= q2End) return "2";
  if (now >= q3Start && now <= q3End) return "3";
  if (now >= q4Start && now <= q4End) return "4";

  return "0";
}

export default function RekapData() {
    const [tm, setTm] = useState(monthToTM());
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

    useEffect(() => {
        fetAllSurvey()
    }, [])

    useEffect(() => {
        fetAllSurvey()
    }, [tm])

    const fetAllSurvey = async () => {
        setIsLoading(true)
        try {
            const res = await axios.get('/api/survey?all=true&trismester=' + tm + '&year=' + format(new Date(), 'yyyy'),
                {
                    headers: {
                        'Authorization': 'Basic c3VydmV5c2lzZGE6cGFzczJzaXNkYXN1cnZleQ=='
                    }
                }
            )
            console.log('response rekap', res.data)
            itemAverage(res.data.data)
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
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
            avr.kualitas_sarana += data[i].kewajaran_biaya
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
            avr[k] = avr[k] / data.length;
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
                                value={tm}
                                onChange={(e) => {
                                    setTm(e.target.value)
                                }}
                            >
                                <option value={1}>Triwulan 1 ({format(new Date(), 'yyyy')})</option>
                                <option value={2}>Triwulan 2 ({format(new Date(), 'yyyy')})</option>
                                <option value={3}>Triwulan 3 ({format(new Date(), 'yyyy')})</option>
                                <option value={4}>Triwulan 4 ({format(new Date(), 'yyyy')})</option>
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