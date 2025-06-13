import Wave from "react-wavify"
import { loadCaptchaEnginge, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import axios from "../libs/axios";
import { useNavigate } from "react-router-dom";
// import { UploadFileMultiple } from "../components/upload-file-multiple";
import UploadFile from "../components/upload-file";

export default function Gratifikasi() {
    const navigate = useNavigate()
    const captchaRef = useRef<any>()
    const [formData, setFormData] = useState<any>({
        nama: "",
        jenis_pelaporan: "",
        asal_pelapor: "",
        bukti_dukung: []
    })
    const [isLoading, setIsLoading] = useState(false)
    const [jenisPelaporanIsLainnya, setJenisPelaporanIsLainnya] = useState(false)
    const [asalPelaporanIsLainnya, setAsalPelaporanIsLainnya] = useState(false)
    const [valueJenisPelaporanIsLainnya, setValueJenisPelaporanIsLainnya] = useState("")
    const [valueAsalPelaporanIsLainnya, setValueAsalPelaporanIsLainnya] = useState("")

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    useEffect(() => {
        //   console.log('form data', formData)
        if (formData.jenis_pelaporan == "Lainnya") {
            setJenisPelaporanIsLainnya(true)
        } else {
            setJenisPelaporanIsLainnya(false)
        }

        if (formData.asal_pelapor == "Lainnya") {
            setAsalPelaporanIsLainnya(true)
        } else {
            setAsalPelaporanIsLainnya(false)
        }

    }, [formData])

    const checkCaptcha = () => {
        let user_captcha = captchaRef.current.value
        console.log('user captcha', user_captcha)

        if (validateCaptcha(user_captcha, false) == true) {
            // alert('Captcha Matched');
            return true
        }

        else {
            return false
        }
    };

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
            if (formData.jenis_pelaporan == "Lainnya") {
                data.jenis_pelaporan = valueJenisPelaporanIsLainnya
            }

            if (formData.asal_pelapor == "Lainnya") {
                data.asal_pelapor = valueAsalPelaporanIsLainnya
            }

            const res = await axios.post('/api/gratifikasi', data,
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
                        <h1 className="font-semibold text-4xl text-center text-white">Gratifikasi / Penyuapan</h1>
                        <div className="p-6 bg-white shadow rounded-xl border mt-8">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">Form Laporan Gratifikasi / Penyuapan BBWS NT 1</h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">Laporan Gratifikasi / Penyuapan di lingkungan BBWS NT 1</p>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-6">
                                    <label htmlFor="nama" className="block text-sm font-medium leading-6 text-gray-900">
                                        Nama Lengkap <span className="italic text-gray-500">(opsional)</span>
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="nama"
                                            id="nama"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            onChange={handleOnChange}
                                            value={formData.nama}
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="jenis_pelaporan" className="block text-sm font-medium leading-6 text-gray-900">
                                        Jenis Pelaporan
                                    </label>
                                    <div className="mt-2 w-full">
                                        <select
                                            name="jenis_pelaporan"
                                            id="jenis_pelaporan"
                                            autoComplete="jenis_pelaporan"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            value={formData.jenis_pelaporan}
                                            onChange={handleOnChange}
                                            required
                                        >
                                            <option>Pilih jenis pelaporan</option>
                                            <option value={'Penyuapan'}>Penyuapan</option>
                                            <option value={'Gratifikasi'}>Gratifikasi</option>
                                            <option value={'Lainnya'}>Lainnya</option>
                                        </select>

                                        {jenisPelaporanIsLainnya &&
                                            <input
                                                type="text"
                                                name=""
                                                id="jeni_pelaporan"
                                                className="block w-full mt-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                onChange={(e) => {
                                                    setValueJenisPelaporanIsLainnya(e.target.value)
                                                }}
                                                value={valueJenisPelaporanIsLainnya}
                                            />
                                        }
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="asal_pelapor" className="block text-sm font-medium leading-6 text-gray-900">
                                        Asal Pelaporan
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            name="asal_pelapor"
                                            id="asal_pelapor"
                                            autoComplete="jenis_pelaporan"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            value={formData.asal_pelapor}
                                            onChange={handleOnChange}
                                            required
                                        >
                                            <option>Pilih asal pelaporan</option>
                                            <option value={'Pegawai'}>Pegawai</option>
                                            <option value={'Masyarakat'}>Masyarakat</option>
                                            <option value={'Mitra'}>Mitra</option>
                                            <option value={'Lainnya'}>Lainnya</option>
                                        </select>

                                        {asalPelaporanIsLainnya &&
                                            <input
                                                type="text"
                                                name=""
                                                id="asal_pelapor"
                                                className="block w-full mt-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                onChange={(e) => {
                                                    setValueAsalPelaporanIsLainnya(e.target.value)
                                                }}
                                                value={valueAsalPelaporanIsLainnya}
                                            />
                                        }
                                    </div>
                                </div>

                                <div className="sm:col-span-6">
                                    <label htmlFor="nama" className="block text-sm font-medium leading-6 text-gray-900">
                                        Bukti Dukung Pelaporan
                                    </label>
                                    <div className="mt-2">
                                        {/* <input
                                            type="file"
                                            name="bukti_dukung"
                                            id="bukti_dukung"
                                            className="block w-full px-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            onChange={handleOnChange}
                                            value={formData.bukti_dukung}
                                        /> */}

                                        {/* <UploadFileMultiple name="bukti_dukung" value={formData.bukti_dukung} onChange={(e) => {
                                            console.log('on change', e)
                                        }} /> */}

                                        <UploadFile onChange={(v: any) => {
                                            setFormData({
                                                ...formData,
                                                bukti_dukung: v
                                            })
                                        }} />
                                    </div>
                                </div>

                                <div className="sm:col-span-6">
                                    <div className="w-full flex justify-center rounded-lg p-4">
                                        <div className="flex flex-wrap justify-center gap-4 items-center text-sm mt-2">
                                            <div>
                                                <LoadCanvasTemplateNoReload />
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
