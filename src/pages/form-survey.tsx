import Wave from "react-wavify"
import { loadCaptchaEnginge, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import axios from "../libs/axios";
import { useNavigate } from "react-router-dom";

export default function FormSurvey() {
    const navigate = useNavigate()
    const captchaRef = useRef<any>()
    const captchaLength = 6
    const [formData, setFormData] = useState({
        nama: "",
        no_hp: "",
        jenis_pelayanan: "",
        jenis_kelamin: "",
        pendidikan: "",
        usia: "",
        pekerjaan: "",
        tanggal_kunjungan: "",
        kesesuaian_persyaratan: 0,
        kemudahan_prosedur: 0,
        kecepatan_pelayanan: 0,
        kewajaran_biaya: 0,
        kesesuaian_pelayanan: 0,
        kemampuan_petugas: 0,
        perilaku_petugas: 0,
        kualitas_sarana: 0,
        penanganan_pengaduan: 0,
        petugas_minta_imbalan: "",
        hal_kurang_berkenan: "",
        hal_paling_berkesan: "",
    })
    const [isLoading, setIsLoading] = useState(false)
    const [isShowFormPekerjaanLainnya, setIsShowFormPekerjaanLainnya] = useState(false)
    const [valueFormPekerjaanLainnya, setValueFormPekerjaanLainnya] = useState("")
    const [isShowFormPelayananLainnya, setIsShowFormPelayananLainnya] = useState(false)
    const [valueFormPelayananLainnya, setValueFormPelayananLainnya] = useState("")

    useEffect(() => {
        loadCaptchaEnginge(captchaLength);
    }, [])

    useEffect(() => {
        // console.log('form data', formData)

        if (formData.jenis_pelayanan == "Lainnya") {
            setIsShowFormPelayananLainnya(true)
        } else {
            setIsShowFormPelayananLainnya(false)
        }

        if (formData.pekerjaan == "Lainnya") {
            setIsShowFormPekerjaanLainnya(true)
        } else {
            setIsShowFormPekerjaanLainnya(false)
        }

    }, [formData])

    // useEffect(() => {
    //     console.log('value form lainnya', valueFormPelayananLainnya)
    // }, [valueFormPelayananLainnya])

    const checkCaptcha = () => {
        let user_captcha = captchaRef.current.value
        console.log('user captcha', user_captcha)

        if (validateCaptcha(user_captcha, false) == true) {
            // alert('Captcha Matched');
            return true
        }

        else {
            loadCaptchaEnginge(captchaLength);
            return false
        }
    };

    const reloadCaptcha = () => {
        loadCaptchaEnginge(captchaLength);
    }

    const handleOnChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleOnSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()
        if (!checkCaptcha()) {
            return alert('Captcha Does Not Match');
        }

        setIsLoading(true)
        try {

            let data = { ...formData }
            if (data.jenis_pelayanan == "Lainnya") {
                console.log('value lainnya', valueFormPelayananLainnya)
                data.jenis_pelayanan = "Lainnya - " + valueFormPelayananLainnya
            }

            if (data.pekerjaan == "Lainnya") {
                console.log('value lainnya', valueFormPekerjaanLainnya)
                data.pekerjaan = "Lainnya - " + valueFormPekerjaanLainnya
            }

            console.log('data baru', data)

            const res = await axios.post('/api/survey', data,
                {
                    headers: {
                        'Authorization': 'Basic c3VydmV5c2lzZGE6cGFzczJzaXNkYXN1cnZleQ=='
                    }
                }
            )
            console.log('response', res.data)
            navigate('/terima-kasih')
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }

        // console.log('form data', formData)
    }

    return (
        <>
            <div className="relative w-full">
                <div className="absolute w-full top-0">
                    <div className="bg-gradient-to-b from-blue-950 to-blue-800 w-full h-[450px] relative">
                        <div className="absolute bottom-0 w-full">
                            <Wave fill='#ffffff'
                                paused={false}
                                style={{ display: 'flex', opacity: 0.5 }}
                                options={{
                                    height: 30,
                                    amplitude: 30,
                                    speed: 0.09,
                                    points: 3
                                }}
                            />
                        </div>
                        <div className="absolute bottom-0 w-full">
                            <Wave fill='#ffffff'
                                paused={false}
                                style={{ display: 'flex', opacity: 0.7 }}
                                options={{
                                    height: 30,
                                    amplitude: 30,
                                    speed: 0.12,
                                    points: 3
                                }}
                            />
                        </div>
                        <div className="absolute bottom-0 w-full">
                            <Wave fill='#ffffff'
                                paused={false}
                                style={{ display: 'flex', opacity: 1 }}
                                options={{
                                    height: 30,
                                    amplitude: 30,
                                    speed: 0.15,
                                    points: 3
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-3xl px-4 pt-16 relative z-10">
                    <form onSubmit={handleOnSubmit}>
                        <h1 className="font-semibold text-4xl text-center text-white">Survey Kepuasan Masyarakat</h1>
                        <div className="p-6 bg-white shadow rounded-xl border mt-8">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Form Survey Kepuasan Masyarakat</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">Survey Kepuasan Masyarakat dalam pelayanan BBWS NT I Mataram</p>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label htmlFor="nama" className="block text-sm font-medium leading-6 text-gray-900">
                                        Nama Lengkap
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="nama"
                                            id="nama"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            onChange={handleOnChange}
                                            value={formData.nama}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="nama" className="block text-sm font-medium leading-6 text-gray-900">
                                        Nomor HP
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="no_hp"
                                            id="no_hp"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            onChange={handleOnChange}
                                            value={formData.no_hp}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="jenis_kelamin" className="block text-sm font-medium leading-6 text-gray-900">
                                        Jenis Kelamin
                                    </label>
                                    <div className="mt-2 w-full">
                                        <select
                                            name="jenis_kelamin"
                                            id="jenis_kelamin"
                                            autoComplete="jenis_kelamin"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            value={formData.jenis_kelamin}
                                            onChange={handleOnChange}
                                            required
                                        >
                                            <option>Pilih jenis kelamin</option>
                                            <option value={'Laki - Laki'}>Laki-Laki</option>
                                            <option value={'Perempuan'}>Perempuan</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="pendidikan" className="block text-sm font-medium leading-6 text-gray-900">
                                        Pendidikan
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            name="pendidikan"
                                            id="pendidikan"
                                            autoComplete="pendidikan"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            value={formData.pendidikan}
                                            onChange={handleOnChange}
                                            required
                                        >
                                            <option>Pilih Pendidikan</option>
                                            <option value={'SD'}>SD/MI</option>
                                            <option value={'SMP'}>SMP/MTS</option>
                                            <option value={'SMA'}>SMA/SLTA/SMK/MA</option>
                                            <option value={'S1'}>S1</option>
                                            <option value={'S2'}>S2</option>
                                            <option value={'S3'}>S3</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="usia" className="block text-sm font-medium leading-6 text-gray-900">
                                        Usia
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            name="usia"
                                            id="usia"
                                            autoComplete="usia"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            value={formData.usia}
                                            onChange={handleOnChange}
                                            required
                                        >
                                            <option>Pilih Usia</option>
                                            <option value={'Kurang dari 18 tahun'}>Kurang dari 18 tahun</option>
                                            <option value={'18 s.d 25 tahun'}>18 s.d 25 tahun</option>
                                            <option value={'26 s.d 35 tahun'}>26 s.d 35 tahun</option>
                                            <option value={'36 s.d 45 tahun'}>36 s.d 45 tahun</option>
                                            <option value={'46 s.d 55 tahun'}>46 s.d 55 tahun</option>
                                            <option value={'Lebih dari 56 tahun'}>Lebih dari 56 tahun</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="pekerjaan" className="block text-sm font-medium leading-6 text-gray-900">
                                        Pekerjaan
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            name="pekerjaan"
                                            id="pekerjaan"
                                            autoComplete="pekerjaan"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            value={formData.pekerjaan}
                                            onChange={handleOnChange}
                                            required
                                        >
                                            <option>Pilih Pekerjaan</option>
                                            <option value={'Pelajar/Mahasiswa'}>Pelajar/Mahasiswa</option>
                                            <option value={'Guru/Dosen'}>Guru/Dosen</option>
                                            <option value={'ASN'}>ASN</option>
                                            <option value={'Karyawan Swasta'}>Karyawan Swasta</option>
                                            <option value={'Karyawan BUMN'}>Karyawan BUMN</option>
                                            <option value={'Petani'}>Petani</option>
                                            <option value={'Nelayan'}>Nelayan</option>
                                            <option value={'Freelancer'}>Freelancer</option>
                                            <option value={'Tidak Bekerja'}>Tidak Bekerja</option>
                                            <option value={'Lainnya'}>Lainnya</option>
                                        </select>

                                        {isShowFormPekerjaanLainnya &&
                                            <input
                                                type="text"
                                                name=""
                                                id=""
                                                autoComplete=""
                                                className="block w-full mt-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder=""
                                                onChange={(e) => {
                                                    setValueFormPekerjaanLainnya(e.target.value)
                                                }}
                                                value={valueFormPekerjaanLainnya}
                                            />
                                        }
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor={formData.jenis_pelayanan} className="block text-sm font-medium leading-6 text-gray-900">
                                        Jenis Pelayanan
                                    </label>
                                    <div className="mt-2">

                                        <select
                                            name="jenis_pelayanan"
                                            id="jenis_pelayanan"
                                            autoComplete="jenis_pelayanan"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            value={formData.jenis_pelayanan}
                                            onChange={handleOnChange}
                                            required
                                        >
                                            <option>Pilih Jenis Pelayanan</option>
                                            <option value={'Pelayanan Permohonan Informasi Publik dan Pengaduan'}>Pelayanan Permohonan Informasi Publik dan Pengaduan</option>
                                            <option value={'Pelayanan Rekomendasi Teknis'}>Pelayanan Rekomendasi Teknis</option>
                                            <option value={'Pelayanan Unit Alokasi Air'}>Pelayanan Unit Alokasi Air</option>
                                            <option value={'Pelayanan Penanggulangan Banjir dan Bencana'}>Pelayanan Penanggulangan Banjir dan Bencana</option>
                                            <option value={'Pelayanan Hidrologi dan Kualitas Air'}>Pelayanan Hidrologi dan Kualitas Air</option>
                                            <option value={'Pelayanan Pengujian Laboratorium'}>Pelayanan Pengujian Laboratorium</option>
                                            <option value={'Lainnya'}>Lainnya</option>
                                        </select>

                                        {isShowFormPelayananLainnya &&
                                            // <input
                                            //     type="text"
                                            //     name=""
                                            //     id=""
                                            //     autoComplete=""
                                            //     className="block w-full mt-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            //     placeholder=""
                                            //     onChange={(e) => {
                                            //         setValueFormPelayananLainnya(e.target.value)
                                            //     }}
                                            //     value={valueFormPelayananLainnya}
                                            // />

                                            <textarea
                                                id="value_jenis_pelayanan"
                                                name="value_jenis_pelayanan"
                                                rows={3}
                                                className="block w-full mt-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                // defaultValue={''}
                                                value={valueFormPelayananLainnya}
                                                onChange={(e) => {
                                                    setValueFormPelayananLainnya(e.target.value)
                                                }}
                                                required
                                            />
                                        }
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor={formData.tanggal_kunjungan} className="block text-sm font-medium leading-6 text-gray-900">
                                        Tanggal Kunjungan
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="date"
                                            name="tanggal_kunjungan"
                                            id={formData.tanggal_kunjungan}
                                            autoComplete="tanggal_kunjungan"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            onChange={handleOnChange}
                                            value={formData.tanggal_kunjungan}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-6">
                                    <fieldset>
                                        <legend className="text-sm font-medium leading-6 text-gray-900">Bagaimana Pendapat Saudara tentang kesesuaian persyaratan pelayanan dengan jenis pelayanan</legend>
                                        {/* <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p> */}
                                        <div className="mt-4 space-y-4">
                                            <div className="flex items-center gap-x-3">
                                                <input
                                                    id="tidak-seusai"
                                                    name="kesesuaian_persyaratan"
                                                    type="radio"
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    value={1}
                                                    onChange={handleOnChange}
                                                    checked={formData.kesesuaian_persyaratan == 1}
                                                    required
                                                />
                                                <label htmlFor="tidak-seusai" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Tidak sesuai
                                                </label>
                                            </div>
                                            <div className="flex items-center gap-x-3">
                                                <input
                                                    id="kurang-sesuai"
                                                    name="kesesuaian_persyaratan"
                                                    type="radio"
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    value={2}
                                                    onChange={handleOnChange}
                                                    checked={formData.kesesuaian_persyaratan == 2}
                                                    required
                                                />
                                                <label htmlFor="kurang-sesuai" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Kurang sesuai
                                                </label>
                                            </div>
                                            <div className="flex items-center gap-x-3">
                                                <input
                                                    id="sesuai"
                                                    name="kesesuaian_persyaratan"
                                                    type="radio"
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    value={3}
                                                    onChange={handleOnChange}
                                                    checked={formData.kesesuaian_persyaratan == 3}
                                                    required
                                                />
                                                <label htmlFor="sesuai" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Sesuai
                                                </label>
                                            </div>
                                            <div className="flex items-center gap-x-3">
                                                <input
                                                    id="sangat-sesuai"
                                                    name="kesesuaian_persyaratan"
                                                    type="radio"
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    value={4}
                                                    onChange={handleOnChange}
                                                    checked={formData.kesesuaian_persyaratan == 4}
                                                    required
                                                />
                                                <label htmlFor="sangat-sesuai" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Sangat sesuai
                                                </label>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>

                                <div className="sm:col-span-6">
                                    <fieldset>
                                        <legend className="text-sm font-medium leading-6 text-gray-900">
                                            Bagaimana pemahaman Saudara tentang kemudahan prosedur pelayanan di unit ini
                                        </legend>
                                        {/* <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p> */}
                                        <div className="mt-4 space-y-4">
                                            <div className="flex items-center gap-x-3">
                                                <input
                                                    id="tidak-mudah"
                                                    name="kemudahan_prosedur"
                                                    type="radio"
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    value={1}
                                                    onChange={handleOnChange}
                                                    checked={formData.kemudahan_prosedur == 1}
                                                    required
                                                />
                                                <label htmlFor="tidak-mudah" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Tidak mudah
                                                </label>
                                            </div>
                                            <div className="flex items-center gap-x-3">
                                                <input
                                                    id="kurang-mudah"
                                                    name="kemudahan_prosedur"
                                                    type="radio"
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    value={2}
                                                    onChange={handleOnChange}
                                                    checked={formData.kemudahan_prosedur == 2}
                                                    required
                                                />
                                                <label htmlFor="kurang-mudah" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Kurang mudah
                                                </label>
                                            </div>
                                            <div className="flex items-center gap-x-3">
                                                <input
                                                    id="mudah"
                                                    name="kemudahan_prosedur"
                                                    type="radio"
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    value={3}
                                                    onChange={handleOnChange}
                                                    checked={formData.kemudahan_prosedur == 3}
                                                    required
                                                />
                                                <label htmlFor="mudah" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Mudah
                                                </label>
                                            </div>
                                            <div className="flex items-center gap-x-3">
                                                <input
                                                    id="sangat-mudah"
                                                    name="kemudahan_prosedur"
                                                    type="radio"
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    value={4}
                                                    onChange={handleOnChange}
                                                    checked={formData.kemudahan_prosedur == 4}
                                                    required
                                                />
                                                <label htmlFor="sangat-mudah" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Sangat mudah
                                                </label>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>

                                <div className="sm:col-span-6">
                                    <fieldset>
                                        <legend className="text-sm font-medium leading-6 text-gray-900">
                                            Bagaimana pendapat Saudara tentang kecepatan waktu dalam memberikan pelayanan
                                        </legend>
                                        {/* <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p> */}
                                        <div className="mt-4 space-y-4">
                                            <div className="flex items-center gap-x-3">
                                                <input
                                                    id="tidak-cepat"
                                                    name="kecepatan_pelayanan"
                                                    type="radio"
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    value={1}
                                                    onChange={handleOnChange}
                                                    checked={formData.kecepatan_pelayanan == 1}
                                                    required
                                                />
                                                <label htmlFor="tidak-cepat" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Tidak cepat
                                                </label>
                                            </div>
                                            <div className="flex items-center gap-x-3">
                                                <input
                                                    id="kurang-cepat"
                                                    name="kecepatan_pelayanan"
                                                    type="radio"
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    value={2}
                                                    onChange={handleOnChange}
                                                    checked={formData.kecepatan_pelayanan == 2}
                                                    required
                                                />
                                                <label htmlFor="kurang-cepat" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Kurang cepat
                                                </label>
                                            </div>
                                            <div className="flex items-center gap-x-3">
                                                <input
                                                    id="cepat"
                                                    name="kecepatan_pelayanan"
                                                    type="radio"
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    value={3}
                                                    onChange={handleOnChange}
                                                    checked={formData.kecepatan_pelayanan == 3}
                                                    required
                                                />
                                                <label htmlFor="cepat" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Cepat
                                                </label>
                                            </div>
                                            <div className="flex items-center gap-x-3">
                                                <input
                                                    id="sangat-cepat"
                                                    name="kecepatan_pelayanan"
                                                    type="radio"
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    value={4}
                                                    onChange={handleOnChange}
                                                    checked={formData.kecepatan_pelayanan == 4}
                                                    required
                                                />
                                                <label htmlFor="sangat-cepat" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Sangat Cepat
                                                </label>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>

                                <div className="sm:col-span-6">
                                    <fieldset>
                                        <legend className="text-sm font-medium leading-6 text-gray-900">
                                            Bagaimana pendapat Saudara tentang kewajaran biaya/tarif dalam pelayanan
                                        </legend>
                                        {/* <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p> */}
                                        <div className="mt-4 space-y-4">
                                            <div className="flex items-center gap-x-3">
                                                <input
                                                    id="sangat-mahal"
                                                    name="kewajaran_biaya"
                                                    type="radio"
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    value={1}
                                                    onChange={handleOnChange}
                                                    checked={formData.kewajaran_biaya == 1}
                                                    required
                                                />
                                                <label htmlFor="sangat-mahal" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Sangat mahal
                                                </label>
                                            </div>
                                            <div className="flex items-center gap-x-3">
                                                <input
                                                    id="cukup-mahal"
                                                    name="kewajaran_biaya"
                                                    type="radio"
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    value={2}
                                                    onChange={handleOnChange}
                                                    checked={formData.kewajaran_biaya == 2}
                                                    required
                                                />
                                                <label htmlFor="cukup-mahal" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Cukup mahal
                                                </label>
                                            </div>
                                            <div className="flex items-center gap-x-3">
                                                <input
                                                    id="murah"
                                                    name="kewajaran_biaya"
                                                    type="radio"
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    value={3}
                                                    onChange={handleOnChange}
                                                    checked={formData.kewajaran_biaya == 3}
                                                    required
                                                />
                                                <label htmlFor="murah" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Murah
                                                </label>
                                            </div>
                                            <div className="flex items-center gap-x-3">
                                                <input
                                                    id="gratis"
                                                    name="kewajaran_biaya"
                                                    type="radio"
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    value={4}
                                                    onChange={handleOnChange}
                                                    checked={formData.kewajaran_biaya == 4}
                                                    required
                                                />
                                                <label htmlFor="gratis" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Gratis
                                                </label>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>

                                <div className="sm:col-span-6">
                                    <fieldset>
                                        <legend className="text-sm font-medium leading-6 text-gray-900">
                                            Bagaimana pendapat Saudara tentang kesesuaian produk pelayanan antara yang tercantum dalam standar pelayanan dengan hasil yang diberikan
                                        </legend>
                                        {/* <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p> */}
                                        <div className="mt-4 space-y-4">
                                            <div className="flex items-center gap-x-3">
                                                <input
                                                    id="tidak-sesuai-1"
                                                    name="kesesuaian_pelayanan"
                                                    type="radio"
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    value={1}
                                                    onChange={handleOnChange}
                                                    checked={formData.kesesuaian_pelayanan == 1}
                                                    required
                                                />
                                                <label htmlFor="tidak-sesuai-1" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Tidak sesuai
                                                </label>
                                            </div>
                                            <div className="flex items-center gap-x-3">
                                                <input
                                                    id="kurang-sesuai-1"
                                                    name="kesesuaian_pelayanan"
                                                    type="radio"
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    value={2}
                                                    onChange={handleOnChange}
                                                    checked={formData.kesesuaian_pelayanan == 2}
                                                    required
                                                />
                                                <label htmlFor="kurang-sesuai-1" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Kurang sesuai
                                                </label>
                                            </div>
                                            <div className="flex items-center gap-x-3">
                                                <input
                                                    id="sesuai-1"
                                                    name="kesesuaian_pelayanan"
                                                    type="radio"
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    value={3}
                                                    onChange={handleOnChange}
                                                    checked={formData.kesesuaian_pelayanan == 3}
                                                    required
                                                />
                                                <label htmlFor="sesuai-1" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Sesuai
                                                </label>
                                            </div>
                                            <div className="flex items-center gap-x-3">
                                                <input
                                                    id="sangat-sesuai-1"
                                                    name="kesesuaian_pelayanan"
                                                    type="radio"
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    value={4}
                                                    onChange={handleOnChange}
                                                    checked={formData.kesesuaian_pelayanan == 4}
                                                    required
                                                />
                                                <label htmlFor="sangat-sesuai-1" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Sangat sesuai
                                                </label>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>

                                <div className="sm:col-span-6">
                                    <fieldset>
                                        <legend className="text-sm font-medium leading-6 text-gray-900">
                                            Bagaimana pendapat Saudara tentang kompetensi/kemampuan petugas dalam pelayanan
                                        </legend>
                                        {/* <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p> */}
                                        <div className="mt-4 space-y-4">
                                            <div className="flex items-center gap-x-3">
                                                <input
                                                    id="tidak-kompeten"
                                                    name="kemampuan_petugas"
                                                    type="radio"
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    value={1}
                                                    onChange={handleOnChange}
                                                    checked={formData.kemampuan_petugas == 1}
                                                    required
                                                />
                                                <label htmlFor="tidak-kompeten" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Tidak kompeten
                                                </label>
                                            </div>
                                            <div className="flex items-center gap-x-3">
                                                <input
                                                    id="kurang-kompeten"
                                                    name="kemampuan_petugas"
                                                    type="radio"
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    value={2}
                                                    onChange={handleOnChange}
                                                    checked={formData.kemampuan_petugas == 2}
                                                    required
                                                />
                                                <label htmlFor="kurang-kompeten" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Kurang kompeten
                                                </label>
                                            </div>
                                            <div className="flex items-center gap-x-3">
                                                <input
                                                    id="kompeten"
                                                    name="kemampuan_petugas"
                                                    type="radio"
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    value={3}
                                                    onChange={handleOnChange}
                                                    checked={formData.kemampuan_petugas == 3}
                                                    required
                                                />
                                                <label htmlFor="kompeten" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Kompeten
                                                </label>
                                            </div>
                                            <div className="flex items-center gap-x-3">
                                                <input
                                                    id="sangat-kompeten"
                                                    name="kemampuan_petugas"
                                                    type="radio"
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    value={4}
                                                    onChange={handleOnChange}
                                                    checked={formData.kemampuan_petugas == 4}
                                                    required
                                                />
                                                <label htmlFor="sangat-kompeten" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Sangat kompeten
                                                </label>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>

                                <div className="sm:col-span-6">
                                    <fieldset>
                                        <legend className="text-sm font-medium leading-6 text-gray-900">
                                            Bagaimana pendapat Saudara tentang perilaku petugas dalam pelayanan terkait kesopanan dan keramahan
                                        </legend>
                                        {/* <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p> */}
                                        <div className="mt-4 space-y-4">
                                            <div className="flex items-center gap-x-3">
                                                <input
                                                    id="tidak-sopan"
                                                    name="perilaku_petugas"
                                                    type="radio"
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    value={1}
                                                    onChange={handleOnChange}
                                                    checked={formData.perilaku_petugas == 1}
                                                    required
                                                />
                                                <label htmlFor="tidak-sopan" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Tidak sopan dan ramah
                                                </label>
                                            </div>
                                            <div className="flex items-center gap-x-3">
                                                <input
                                                    id="kurang-sopan"
                                                    name="perilaku_petugas"
                                                    type="radio"
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    value={2}
                                                    onChange={handleOnChange}
                                                    checked={formData.perilaku_petugas == 2}
                                                    required
                                                />
                                                <label htmlFor="kurang-sopan" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Kurang sopan dan ramah
                                                </label>
                                            </div>
                                            <div className="flex items-center gap-x-3">
                                                <input
                                                    id="sopan"
                                                    name="perilaku_petugas"
                                                    type="radio"
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    value={3}
                                                    onChange={handleOnChange}
                                                    checked={formData.perilaku_petugas == 3}
                                                    required
                                                />
                                                <label htmlFor="sopan" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Sopan dan ramah
                                                </label>
                                            </div>
                                            <div className="flex items-center gap-x-3">
                                                <input
                                                    id="sangat-sopan"
                                                    name="perilaku_petugas"
                                                    type="radio"
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    value={4}
                                                    onChange={handleOnChange}
                                                    checked={formData.perilaku_petugas == 4}
                                                    required
                                                />
                                                <label htmlFor="sangat-sopan" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Sangat sopan dan ramah
                                                </label>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>

                                <div className="sm:col-span-6">
                                    <fieldset>
                                        <legend className="text-sm font-medium leading-6 text-gray-900">
                                            Bagaimana pendapat Saudara tentang kualitas sarana dan prasarana
                                        </legend>
                                        {/* <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p> */}
                                        <div className="mt-4 space-y-4">
                                            <div className="flex items-center gap-x-3">
                                                <input
                                                    id="buruk"
                                                    name="kualitas_sarana"
                                                    type="radio"
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    value={1}
                                                    onChange={handleOnChange}
                                                    checked={formData.kualitas_sarana == 1}
                                                    required
                                                />
                                                <label htmlFor="buruk" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Buruk
                                                </label>
                                            </div>
                                            <div className="flex items-center gap-x-3">
                                                <input
                                                    id="cukup"
                                                    name="kualitas_sarana"
                                                    type="radio"
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    value={2}
                                                    onChange={handleOnChange}
                                                    checked={formData.kualitas_sarana == 2}
                                                    required
                                                />
                                                <label htmlFor="cukup" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Cukup
                                                </label>
                                            </div>
                                            <div className="flex items-center gap-x-3">
                                                <input
                                                    id="baik"
                                                    name="kualitas_sarana"
                                                    type="radio"
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    value={3}
                                                    onChange={handleOnChange}
                                                    checked={formData.kualitas_sarana == 3}
                                                    required
                                                />
                                                <label htmlFor="baik" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Baik
                                                </label>
                                            </div>
                                            <div className="flex items-center gap-x-3">
                                                <input
                                                    id="sangat-baik"
                                                    name="kualitas_sarana"
                                                    type="radio"
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    value={4}
                                                    onChange={handleOnChange}
                                                    checked={formData.kualitas_sarana == 4}
                                                    required
                                                />
                                                <label htmlFor="sangat-baik" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Sangat Baik
                                                </label>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>

                                <div className="sm:col-span-6">
                                    <fieldset>
                                        <legend className="text-sm font-medium leading-6 text-gray-900">
                                            Bagaimana pendapat Saudara tentang penangan pengaduan pengguna layanan
                                        </legend>
                                        {/* <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p> */}
                                        <div className="mt-4 space-y-4">
                                            <div className="flex items-center gap-x-3">
                                                <input
                                                    id="tidak-ada"
                                                    name="penanganan_pengaduan"
                                                    type="radio"
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    value={1}
                                                    onChange={handleOnChange}
                                                    checked={formData.penanganan_pengaduan == 1}
                                                />
                                                <label htmlFor="tidak-ada" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Tidak ada
                                                </label>
                                            </div>
                                            <div className="flex items-center gap-x-3">
                                                <input
                                                    id="ada-tidak-berfungsi"
                                                    name="penanganan_pengaduan"
                                                    type="radio"
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    value={2}
                                                    onChange={handleOnChange}
                                                    checked={formData.penanganan_pengaduan == 2}
                                                />
                                                <label htmlFor="ada-tidak-berfungsi" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Ada tetapi tidak berfungsi
                                                </label>
                                            </div>
                                            <div className="flex items-center gap-x-3">
                                                <input
                                                    id="kurang-maksimal"
                                                    name="penanganan_pengaduan"
                                                    type="radio"
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    value={3}
                                                    onChange={handleOnChange}
                                                    checked={formData.penanganan_pengaduan == 3}
                                                />
                                                <label htmlFor="kurang-maksimal" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Berfungsi kurang maksimal
                                                </label>
                                            </div>
                                            <div className="flex items-center gap-x-3">
                                                <input
                                                    id="dikelola-dengan-baik"
                                                    name="penanganan_pengaduan"
                                                    type="radio"
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    value={4}
                                                    onChange={handleOnChange}
                                                    checked={formData.penanganan_pengaduan == 4}
                                                />
                                                <label htmlFor="dikelola-dengan-baik" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Dikelola dengan baik
                                                </label>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>

                                <div className="sm:col-span-6">
                                    <fieldset>
                                        <legend className="text-sm font-medium leading-6 text-gray-900">
                                            Apakah dalam memberikan pelayanannya terdapat oknum petugas Balai yang meminta imbalan baik berupa uang atau barang?
                                        </legend>
                                        {/* <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p> */}
                                        <div className="mt-4 space-y-4">
                                            <div className="flex items-center gap-x-3">
                                                <input
                                                    id="petugas-minta-imbalan-ya"
                                                    name="petugas_minta_imbalan"
                                                    type="radio"
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    value={"ya"}
                                                    onChange={handleOnChange}
                                                    checked={formData.petugas_minta_imbalan == "ya"}
                                                    required
                                                />
                                                <label htmlFor="petugas-minta-imbalan-ya" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Ya
                                                </label>
                                            </div>
                                            <div className="flex items-center gap-x-3">
                                                <input
                                                    id="petugas-minta-imbalan-tidak"
                                                    name="petugas_minta_imbalan"
                                                    type="radio"
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    value={"tidak"}
                                                    onChange={handleOnChange}
                                                    checked={formData.petugas_minta_imbalan == "tidak"}
                                                    required
                                                />
                                                <label htmlFor="petugas-minta-imbalan-tidak" className="block text-sm font-medium leading-6 text-gray-900">
                                                    Tidak
                                                </label>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>

                                {/* <div className="sm:col-span-6">
                                    <fieldset>
                                        <legend className="text-sm font-medium leading-6 text-gray-900">
                                            Hal apa yang anda rasa kurang berkenan pada pelayanan Kami
                                        </legend>
                                        <div className="mt-4 space-y-4">
                                            <textarea
                                                id="yang_dirasakan_kurang_berkenan"
                                                name="yang_dirasakan_kurang_berkenan"
                                                rows={3}
                                                className="block w-full mt-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                value={formData.yang_dirasakan_kurang_berkenan}
                                                onChange={handleOnChange}
                                                required
                                            />
                                        </div>
                                    </fieldset>
                                </div> */}

                                <div className="sm:col-span-6">
                                    <label htmlFor="hal_kurang_berkenan" className="block text-sm font-medium leading-6 text-gray-900">
                                        Hal apa yang anda rasa kurang berkenan pada pelayanan kami
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                            id="hal_kurang_berkenan"
                                            name="hal_kurang_berkenan"
                                            rows={3}
                                            className="block w-full mt-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            value={formData.hal_kurang_berkenan}
                                            onChange={handleOnChange}

                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-6">
                                    <label htmlFor="hal_paling_berkesan" className="block text-sm font-medium leading-6 text-gray-900">
                                        Hal apa yang menurut Anda paling berkesan pada pelayanan kami
                                    </label>
                                    <div className="mt-2">
                                        <textarea
                                            id="hal_paling_berkesan"
                                            name="hal_paling_berkesan"
                                            rows={3}
                                            className="block w-full mt-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            value={formData.hal_paling_berkesan}
                                            onChange={handleOnChange}
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-6">
                                    <div className="w-full flex justify-center rounded-lg border p-4">
                                        <div className="flex flex-wrap justify-center gap-4 items-center text-sm mt-2">
                                            <div className="flex items-center gap-3">
                                                <LoadCanvasTemplateNoReload />
                                                <button
                                                    type="button"
                                                    onClick={reloadCaptcha}
                                                    className="inline-flex items-center justify-center rounded-md border p-2 text-gray-700 hover:bg-gray-50"
                                                    aria-label="Muat ulang captcha"
                                                    title="Muat ulang captcha"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                                                        <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
                                                        <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
                                                    </svg>
                                                </button>
                                            </div>
                                            <div>
                                                <input
                                                    ref={captchaRef}
                                                    placeholder="Enter Captcha Value"
                                                    id="user_captcha_input"
                                                    name="user_captcha_input"
                                                    type="text"
                                                    className="block w-[200px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="sm:col-span-6">
                                    <button
                                        type="submit"
                                        className="rounded-md mt-2 w-full bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                    >
                                        {isLoading ? 'Loading...' : 'Simpan'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
