import { Link } from "react-router-dom";
import Wave from "react-wavify";

export default function Pelayanan() {
    return (
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

            <div className="mx-auto max-w-4xl px-4 pt-16 relative z-10">
                <h1 className="font-semibold text-4xl text-center text-white">Portal Layanan & Pengaduan</h1>
                <div className="bg-white shadow rounded-xl border p-6 mt-8">
                    <h2 className="text-2xl font-semibold">Layanan</h2>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Link to={'https://sda.pu.go.id/balai/bwsnt1/kontak'} target="_blank" className="rounded-lg border p-2">
                            <div className="aspect-square bg-gray-200 rounded-md">
                                <img className="w-full h-full object-cover" src="/contact-us.jpeg" alt="" />
                            </div>
                            <div className="mt-2 font-semibold">
                                KONTAK KAMI
                            </div>
                        </Link>

                        <Link to={'https://erekomtek.bwsnt1.net/login'} target="_blank" className="rounded-lg border p-2">
                            <div className="aspect-square bg-gray-200 rounded-md">
                                <img className="w-full h-full object-cover" src="/report.png" alt="" />
                            </div>
                            <div className="mt-2 font-semibold">
                                E-REKOMTEK
                            </div>
                        </Link>

                        <Link to={'https://sahabat.pu.go.id/eppid/'} target="_blank" className="rounded-lg border p-2">
                            <div className="aspect-square bg-gray-200 rounded-md">
                                <img className="w-full h-full object-cover" src="/pu.jpg" alt="" />
                            </div>
                            <div className="mt-2 font-semibold">
                                E-PPID
                            </div>
                        </Link>
                    </div>


                    <h2 className="text-2xl font-semibold mt-8">Pengaduan</h2>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Link to={'https://wispu.pu.go.id/'} target="_blank" className="rounded-lg border p-2">
                            <div className="aspect-square bg-gray-200 rounded-md">
                                <img className="w-full h-full object-cover" src="/wispu.png" alt="" />
                            </div>
                            <div className="mt-2 p-1">
                                <div className="font-semibold">
                                    WISPU
                                </div>
                                <p className="text-sm text-gray-500">Laporkan jika anda melihat pelanggaran/kecurangan dari Pejabat/Pegawai Balai Besar Wilayah Sungai Nusa Tenggara I Mataram</p>
                            </div>
                        </Link>
                        <Link to={'https://www.lapor.go.id/'} target="_blank" className="rounded-lg border p-2">
                            <div className="aspect-square bg-gray-200 rounded-md">
                                <img className="w-full h-full object-cover" src="/lapor.png" alt="" />
                            </div>
                            <div className="mt-2">
                                <div className="font-semibold">
                                    LAPOR
                                </div>
                                <p className="text-sm text-gray-500">Laporkan jika anda melihat pelanggaran/kecurangan dari Pejabat/Pegawai Balai Besar Wilayah Sungai Nusa Tenggara I Mataram</p>
                            </div>
                        </Link>
                        <Link to={'https://gol.itjen.pu.go.id/'} target="_blank" className="rounded-lg border p-2">
                            <div className="aspect-square bg-gray-200 rounded-md">
                                <img className="w-full h-full object-cover" src="/gratifikasi-square.png" alt="" />
                            </div>
                            <div className="mt-2">
                                <div className="font-semibold">
                                    E-GRATIFIKASI
                                </div>
                                <p className="text-sm text-gray-500">Laporkan jika anda melihat tindakan gratifikasi dari Pejabat/Pegawai Balai Besar Wilayah Sungai Nusa Tenggara I Mataram</p>
                            </div>
                        </Link>

                        <Link to={'/gratifikasi'} className="rounded-lg border p-2">
                            <div className="aspect-square bg-gray-200 rounded-md">
                                <img className="w-full h-full object-cover" src="/ilustrasi-suap.jpg" alt="" />
                            </div>
                            <div className="mt-2">
                                <div className="font-semibold uppercase">
                                    Kanal pengaduan gratifikasi dan penyuapan BBWS NT I Mataram
                                </div>
                                <p className="text-sm text-gray-500">
                                    Laporkan jika anda melihat tindakan gratifikasi dan penyuapan dari Pejabat/Pegawai Kepada Tim UPG ata Tim FKAP Balai Wilayah Sungai Nusa Tenggara I
                                </p>
                            </div>
                        </Link>

                    </div>

                </div>
            </div>
        </div>
    )
}