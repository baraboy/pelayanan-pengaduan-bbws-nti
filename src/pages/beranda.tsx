import { Link } from "react-router-dom";
import Wave from "react-wavify";
import { useState } from "react";

const dokumentasiImages = [
    { src: "/dokumentasi-kegiatan/1.webp", alt: "Dokumentasi Kegiatan 1" },
    { src: "/dokumentasi-kegiatan/2.webp", alt: "Dokumentasi Kegiatan 2" },
    { src: "/dokumentasi-kegiatan/3.webp", alt: "Dokumentasi Kegiatan 3" },
    { src: "/dokumentasi-kegiatan/4.webp", alt: "Dokumentasi Kegiatan 4" },
    { src: "/dokumentasi-kegiatan/5.webp", alt: "Dokumentasi Kegiatan 5" },
    { src: "/dokumentasi-kegiatan/6.webp", alt: "Dokumentasi Kegiatan 6" },
    { src: "/dokumentasi-kegiatan/7.webp", alt: "Dokumentasi Kegiatan 7" },
    { src: "/dokumentasi-kegiatan/8.jpeg", alt: "Dokumentasi Kegiatan 8" },
    { src: "/dokumentasi-kegiatan/9.jpg", alt: "Dokumentasi Kegiatan 9" },
    { src: "/dokumentasi-kegiatan/10.jpg", alt: "Dokumentasi Kegiatan 10" },
];

export default function Beranda() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <div className="relative w-full">
            <div className="absolute w-full top-0">
                <div className="bg-gradient-to-b from-blue-950 to-blue-800 w-full h-[400px] relative">
                    <div className="absolute bottom-0 w-full">
                        <Wave fill='#ffffff'
                            paused={false}
                            style={{ display: 'flex', opacity: 0.5 }}
                            options={{ height: 30, amplitude: 30, speed: 0.09, points: 3 }}
                        />
                    </div>
                    <div className="absolute bottom-0 w-full">
                        <Wave fill='#ffffff'
                            paused={false}
                            style={{ display: 'flex', opacity: 0.7 }}
                            options={{ height: 30, amplitude: 30, speed: 0.12, points: 3 }}
                        />
                    </div>
                    <div className="absolute bottom-0 w-full">
                        <Wave fill='#ffffff'
                            paused={false}
                            style={{ display: 'flex', opacity: 1 }}
                            options={{ height: 30, amplitude: 30, speed: 0.15, points: 3 }}
                        />
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-6xl px-4 pt-16 relative z-10 pb-12">
                <h1 className="font-semibold text-4xl text-center text-white">Menu Beranda</h1>

                {/* Section Gratifikasi */}
                <div className="bg-white shadow rounded-xl border p-6 mt-8">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-red-100 p-3 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">Gratifikasi & Penyuapan</h2>
                            <p className="text-gray-500 text-sm">Unit Pengendalian Gratifikasi (UPG) BBWS NT I Mataram</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                        {/* Apa itu Gratifikasi */}
                        <div className="bg-blue-50 rounded-lg p-5">
                            <h3 className="font-bold text-lg text-blue-800 mb-3">Apa itu Gratifikasi?</h3>
                            <p className="text-gray-700 text-sm leading-relaxed">
                                <span className="font-semibold">Gratifikasi</span> adalah pemberian dalam arti luas, seperti uang, barang, rabat (diskon), komisi, pinjaman tanpa bunga, tiket perjalanan, fasilitas penginapan, perjalanan wisata, gratifikasi yang diminta oleh Eksekutif, termasuk pada Afiliasi keluarga Afiliasi.
                            </p>
                            <p className="text-gray-700 text-sm leading-relaxed mt-3">
                                Setiap Pegawai Negeri dan Penyelenggara Negara harus menolak gratifikasi yang berhubungan dengan jabatannya dan pihak yang giver, sesuai dengan amanat UU No. 20 Tahun 2001 tentang Perubahan atas UU No. 31 Tahun 1999 tentang Pemberantasan Tindak Pidana Korupsi jo. UU No. 31 Tahun 1999 jo. PP No. 43 Tahun 2018.
                            </p>
                        </div>

                        {/* Kewajiban Melaporkan */}
                        <div className="bg-orange-50 rounded-lg p-5">
                            <h3 className="font-bold text-lg text-orange-800 mb-3">Kewajiban Melaporkan</h3>
                            <p className="text-gray-700 text-sm leading-relaxed">
                                Berdasarkan <span className="font-semibold">Permenpan RB No. 10 Tahun 2020</span>, Pegawai Negeri dan Penyelenggara Negara wajib melaporkan penerimaan gratifikasi paling lambat 14 hari kerja kepada instansi.
                            </p>
                            <p className="text-gray-700 text-sm leading-relaxed mt-3">
                                Pelaporan dilakukan melalui sistem pelaporan gratifikasi yang tersedia di instansi atau dapat dilaporkan langsung kepada UPG BBWS NT I Mataram.
                            </p>
                        </div>
                    </div>

                    {/* Mekanisme Pelaporan */}
                    <div className="mt-6">
                        <h3 className="font-bold text-lg text-gray-800 mb-4">Mekanisme Pelaporan</h3>
                        <div className="grid md:grid-cols-4 gap-4">
                            <div className="text-center">
                                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <span className="font-bold text-blue-700">1</span>
                                </div>
                                <p className="text-sm text-gray-700">Identifikasi Gratifikasi</p>
                            </div>
                            <div className="text-center">
                                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <span className="font-bold text-blue-700">2</span>
                                </div>
                                <p className="text-sm text-gray-700">Isi Formulir Pelaporan</p>
                            </div>
                            <div className="text-center">
                                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <span className="font-bold text-blue-700">3</span>
                                </div>
                                <p className="text-sm text-gray-700">Serahkan ke UPG</p>
                            </div>
                            <div className="text-center">
                                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <span className="font-bold text-blue-700">4</span>
                                </div>
                                <p className="text-sm text-gray-700">Proses & Tindak Lanjut</p>
                            </div>
                        </div>
                    </div>

                    {/* Yang Perlu Dilaporkan */}
                    <div className="mt-6 bg-red-50 rounded-lg p-5">
                        <h3 className="font-bold text-lg text-red-800 mb-3">Yang Perlu Dilaporkan</h3>
                        <ul className="grid md:grid-cols-2 gap-2 text-sm text-gray-700">
                            <li className="flex items-start gap-2">
                                <span className="text-red-500 mt-1">•</span>
                                <span>Penerimaan hadiah/cinderamata dari pihak yang terkait jabatan</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-red-500 mt-1">•</span>
                                <span>Penerimaan uang sebagai penghargaan/penghormatan</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-red-500 mt-1">•</span>
                                <span>Penerimaan komisi dari pihak yang berkaitan</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-red-500 mt-1">•</span>
                                <span>Penerimaan potongan harga khusus dari supplier</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-red-500 mt-1">•</span>
                                <span>Penerimaan fasilitas无偿 (tanpa biaya)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-red-500 mt-1">•</span>
                                <span>Penerimaan hadiah terkait penanganan perkara</span>
                            </li>
                        </ul>
                    </div>

                    {/* Tombol Laporan */}
                    <div className="mt-6 flex flex-wrap gap-4 justify-center">
                        <Link
                            to={'/gratifikasi'}
                            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Lapor Gratifikasi / Penyuapan
                        </Link>
                        <a
                            href="/sertifikat/SAB 00174 (1).pdf"
                            target="_blank"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Lihat Pedoman Gratifikasi
                        </a>
                    </div>
                </div>

                {/* Section Dokumentasi Kegiatan */}
                <div className="bg-white shadow rounded-xl border p-6 mt-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Dokumentasi Kegiatan</h2>
                    <p className="text-gray-500 text-sm mb-6">Galeri kegiatan Unit Pengendalian Gratifikasi BBWS NT I Mataram</p>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {dokumentasiImages.map((img, index) => (
                            <div
                                key={index}
                                className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity border-2 border-gray-200 hover:border-blue-400"
                                onClick={() => setSelectedImage(img.src)}
                            >
                                <img
                                    src={img.src}
                                    alt={img.alt}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Section Link Lainnya */}
                <div className="bg-white shadow rounded-xl border p-6 mt-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Layanan Lainnya</h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        <Link to={'/survey-kepuasan-pelanggan'} className="rounded-lg border p-4 hover:border-blue-400 hover:shadow-md transition-all">
                            <div className="flex items-center gap-3">
                                <div className="bg-green-100 p-3 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800">Survey Kepuasan</h3>
                                    <p className="text-sm text-gray-500">Ikuti survey kepuasan masyarakat</p>
                                </div>
                            </div>
                        </Link>

                        <Link to={'/rekap-data'} className="rounded-lg border p-4 hover:border-blue-400 hover:shadow-md transition-all">
                            <div className="flex items-center gap-3">
                                <div className="bg-purple-100 p-3 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800">Rekap Data</h3>
                                    <p className="text-sm text-gray-500">Lihat rekapitulasi data survey</p>
                                </div>
                            </div>
                        </Link>

                        <a href={'https://sda.pu.go.id/balai/bbwsnt1/kontak'} target="_blank" rel="noopener noreferrer" className="rounded-lg border p-4 hover:border-blue-400 hover:shadow-md transition-all">
                            <div className="flex items-center gap-3">
                                <div className="bg-blue-100 p-3 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800">Kontak Kami</h3>
                                    <p className="text-sm text-gray-500">Hubungi BBWS NT I Mataram</p>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>

            {/* Modal untuk preview gambar */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative max-w-4xl w-full">
                        <button
                            className="absolute -top-12 right-0 text-white hover:text-gray-300"
                            onClick={() => setSelectedImage(null)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <img
                            src={selectedImage}
                            alt="Preview"
                            className="w-full h-auto rounded-lg"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
