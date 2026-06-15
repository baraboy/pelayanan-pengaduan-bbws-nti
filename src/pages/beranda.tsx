import { Link } from "react-router-dom";
import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const dokumentasiImages = [
  { src: "/dokumentasi-kegiatan/1.webp", alt: "Dokumentasi 1" },
  { src: "/dokumentasi-kegiatan/2.webp", alt: "Dokumentasi 2" },
  { src: "/dokumentasi-kegiatan/3.webp", alt: "Dokumentasi 3" },
  { src: "/dokumentasi-kegiatan/4.webp", alt: "Dokumentasi 4" },
  { src: "/dokumentasi-kegiatan/5.webp", alt: "Dokumentasi 5" },
  { src: "/dokumentasi-kegiatan/6.webp", alt: "Dokumentasi 6" },
  { src: "/dokumentasi-kegiatan/7.webp", alt: "Dokumentasi 7" },
  { src: "/dokumentasi-kegiatan/8.jpeg", alt: "Dokumentasi 8" },
  { src: "/dokumentasi-kegiatan/9.jpg", alt: "Dokumentasi 9" },
  { src: "/dokumentasi-kegiatan/10.jpg", alt: "Dokumentasi 10" },
];

export default function Beranda() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="min-h-screen font-sans bg-[#f9f9f9]">
      {/* Hero Section */}
      <section className="relative bg-[#002d62] text-white py-16 md:py-24 px-6 md:px-20 lg:px-32">
        <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr] items-center gap-8 md:gap-16 max-w-7xl mx-auto">
          {/* Left: Text Content */}
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-6">
              Laporkan Gratifikasi dan Penyuapan dengan
              <br />
              <span className="text-[#f2bf2a]">Mudah dan Aman</span>
            </h1>
            <p className="text-base md:text-lg text-gray-200 mb-8 max-w-2xl">
              Kanal resmi pelaporan gratifikasi BBWS NT I Mataram. Mendukung
              tata kelola yang bersih dan transparan melalui sistem yang
              terpercaya dan sesuai ketentuan hukum yang berlaku.
            </p>
            <Link
              to={"/gratifikasi"}
              className="inline-block bg-[#f2bf2a] text-[#002d62] font-semibold py-3 px-10 rounded-full text-lg hover:bg-[#e1a91e] transition duration-300"
            >
              Lapor
            </Link>
          </div>

          {/* Right: Certificate Image */}
          <div className="flex justify-center md:justify-end">
            <img
              src="/sertifikat/Sertifikat ISO 370001.jpg"
              alt="Sertifikat ISO 37001"
              className="w-full max-w-[280px] md:max-w-[400px] h-auto rounded-lg shadow-xl cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => setSelectedImage("/sertifikat/Sertifikat ISO 370001.jpg")}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        </div>
      </section>

      {/* Kegiatan Section */}
      <section className="bg-white text-[#002d62] py-12 px-6 md:px-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-4xl font-extrabold mb-6 text-black">
            Kegiatan
          </h2>
        </div>
        <div className="max-w-6xl mx-auto">
          <Slider {...carouselSettings}>
            {dokumentasiImages.map((img, index) => (
              <div key={index} className="px-2">
                <div
                  className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => setSelectedImage(img.src)}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-[250px] md:h-[350px] object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* Info Sections */}
      <section className="bg-[#f9f9f9] py-12 px-6 md:px-12">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Section 1: Apa itu Gratifikasi */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-[#002d62] rounded-full flex items-center justify-center text-white font-bold text-sm">
                1
              </div>
              <h2 className="text-lg md:text-xl font-bold text-gray-800">
                Apa itu Gratifikasi?
              </h2>
            </div>
            <div className="ml-11 text-gray-700 leading-relaxed space-y-3">
              <p>
                <span className="font-semibold">Gratifikasi</span> adalah
                pemberian dalam arti luas, seperti uang, barang, rabat (diskon),
                komisi, pinjaman tanpa bunga, tiket perjalanan, fasilitas
                penginapan, perjalanan wisata, gratifikasi yang diminta oleh
                Eksekutif, termasuk pada Afiliasi keluarga Afiliasi.
              </p>
              <p>
                Setiap Pegawai Negeri dan Penyelenggara Negara harus menolak
                gratifikasi yang berhubungan dengan jabatannya dan pihak yang
                giver, sesuai dengan amanat UU No. 20 Tahun 2001 tentang
                Perubahan atas UU No. 31 Tahun 1999 tentang Pemberantasan Tindak
                Pidana Korupsi jo. UU No. 31 Tahun 1999 jo. PP No. 43 Tahun
                2018.
              </p>
            </div>
          </div>

          {/* Section 2: Kewajiban Pelaporan */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-[#002d62] rounded-full flex items-center justify-center text-white font-bold text-sm">
                2
              </div>
              <h2 className="text-lg md:text-xl font-bold text-gray-800">
                Kewajiban Pelaporan Gratifikasi
              </h2>
            </div>
            <div className="ml-11 text-gray-700 leading-relaxed">
              <p className="mb-3">
                Berdasarkan{" "}
                <span className="font-semibold">
                  Permenpan RB No. 10 Tahun 2020
                </span>
                , Pegawai Negeri dan Penyelenggara Negara wajib melaporkan
                penerimaan gratifikasi paling lambat 14 hari kerja kepada
                instansi.
              </p>
              <p>
                Pelaporan dilakukan melalui sistem pelaporan gratifikasi yang
                tersedia di instansi atau dapat dilaporkan langsung kepada UPG
                BBWS NT I Mataram.
              </p>
            </div>
          </div>

          {/* Section 3: Mekanisme Pelaporan */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-[#002d62] rounded-full flex items-center justify-center text-white font-bold text-sm">
                3
              </div>
              <h2 className="text-lg md:text-xl font-bold text-gray-800">
                Mekanisme Pelaporan Gratifikasi
              </h2>
            </div>
            <div className="ml-11">
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="font-bold text-[#002d62] text-xl">1</span>
                  </div>
                  <p className="text-sm font-medium text-gray-700">
                    Identifikasi
                    <br />
                    Gratifikasi
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="font-bold text-[#002d62] text-xl">2</span>
                  </div>
                  <p className="text-sm font-medium text-gray-700">
                    Isi Formulir
                    <br />
                    Pelaporan
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="font-bold text-[#002d62] text-xl">3</span>
                  </div>
                  <p className="text-sm font-medium text-gray-700">
                    Serahkan
                    <br />
                    ke UPG
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="font-bold text-[#002d62] text-xl">4</span>
                  </div>
                  <p className="text-sm font-medium text-gray-700">
                    Proses &<br />
                    Tindak Lanjut
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Yang Perlu Dilaporkan */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                4
              </div>
              <h2 className="text-lg md:text-xl font-bold text-gray-800">
                Yang Perlu Dilaporkan
              </h2>
            </div>
            <div className="ml-11">
              <ul className="grid md:grid-cols-2 gap-3">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span className="text-gray-700">
                    Penerimaan hadiah/cinderamata dari pihak yang terkait
                    jabatan
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span className="text-gray-700">
                    Penerimaan uang sebagai penghargaan/penghormatan
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span className="text-gray-700">
                    Penerimaan komisi dari pihak yang berkaitan
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span className="text-gray-700">
                    Penerimaan potongan harga khusus dari supplier
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span className="text-gray-700">
                    Penerimaan fasilitas tanpa biaya dari pihak terkait
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span className="text-gray-700">
                    Penerimaan hadiah terkait penanganan perkara
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-gray-300" />

          {/* Kontak Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-6">
              Kontak Kami
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-xl p-5 text-center">
                <div className="w-12 h-12 bg-[#002d62] rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">Alamat</h3>
                <p className="text-sm text-gray-600">
                  Jl. Langko No. 73 Mataram, NTB
                </p>
              </div>
              <div className="bg-blue-50 rounded-xl p-5 text-center">
                <div className="w-12 h-12 bg-[#002d62] rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">Telepon</h3>
                <p className="text-sm text-gray-600">(0370) 623 070</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-5 text-center">
                <div className="w-12 h-12 bg-[#002d62] rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
                <p className="text-sm text-gray-600">upg@bbwsnt1.com</p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-gray-300" />

          {/* Layanan Lainnya */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-6">
              Layanan Lainnya
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                to={"/survey-kepuasan-pelanggan"}
                className="bg-gray-50 rounded-xl p-5 hover:bg-gray-100 transition-colors border border-gray-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Survey Kepuasan
                    </h3>
                    <p className="text-sm text-gray-500">
                      Ikuti survey kepuasan masyarakat
                    </p>
                  </div>
                </div>
              </Link>

              <Link
                to={"/rekap-data"}
                className="bg-gray-50 rounded-xl p-5 hover:bg-gray-100 transition-colors border border-gray-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-purple-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Rekap Data</h3>
                    <p className="text-sm text-gray-500">
                      Lihat rekapitulasi data survey
                    </p>
                  </div>
                </div>
              </Link>

              <a
                href={"https://sda.pu.go.id/balai/bbwsnt1"}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-50 rounded-xl p-5 hover:bg-gray-100 transition-colors border border-gray-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Website BBWS
                    </h3>
                    <p className="text-sm text-gray-500">
                      Kunjungi website resmi
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Image Preview Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-8"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full">
            <button
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <img
              src={selectedImage}
              alt="Preview"
              className="w-full h-auto rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}
