import { useState } from "react";
import { Link } from "react-router-dom";

export function Navbar() {

    const [isOpen, setIsOpen] = useState(false)


    return (
        <nav className="sticky top-0 w-full z-20 bg-blue-900 border-b-2 border-yellow-500 shadow-md">
            <div className="h-16 max-w-7xl mx-auto px-4 flex items-center justify-between text-white">
                <div className="flex gap-4 items-center">
                    <img src="/pu-logo.png" alt="" className="w-12 rounded-md" />
                    <div className="font-bold text-xl">BBWS NT 1</div>
                </div>
                <div className="hidden md:flex gap-4">
                    <Link to={'/pelayanan-pengaduan'} className="text-sm font-medium">Layanan & Pengaduan</Link>
                    <Link to={'/survey-kepuasan-pelanggan'} className="text-sm font-medium">Survey Kepuasan Masyarakat</Link>
                    <Link to={'/rekap-data'} className="text-sm font-medium">Rekap Data Survey</Link>
                    {/* <Link to={'/gratifikasi'} className="text-sm font-medium">Gratifikasi</Link> */}
                    <a href="https://sda.pu.go.id/balai/bwsnt1/" className="text-sm font-medium">Kembali ke Web Balai</a>
                </div>

                <div className="md:hidden">
                    <button onClick={() => {
                        setIsOpen(!isOpen)
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
                        </svg>
                    </button>
                </div>
            </div>

            {isOpen &&
                <div className="absolute md:hidden flex flex-col bg-blue-900 mt-0.5 text-white w-full py-2 ">
                    <Link to={'/pelayanan-pengaduan'} className="text-sm font-medium w-full px-4 py-2" onClick={() => setIsOpen(false)}>Layanan & Pengaduan</Link>
                    <Link to={'/survey-kepuasan-pelanggan'} className="text-sm font-medium w-full px-4 py-2" onClick={() => setIsOpen(false)}>Survey Kepuasan Masyarakat</Link>
                    <a href="https://sda.pu.go.id/balai/bwsnt1/" className="text-sm font-medium w-full px-4 py-2" onClick={() => setIsOpen(false)}>Kembali ke Web Balai</a>
                </div>
            }
        </nav>
    )
}