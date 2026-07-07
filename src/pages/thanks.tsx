import Wave from "react-wavify"
import jsPDF from "jspdf";

export default function Thanks() {

    const survey = JSON.parse(
    sessionStorage.getItem("surveyData") || "{}"
    );
    const handleBack = () => {
        sessionStorage.removeItem("surveyData");
        window.location.href = "http://sda.pu.go.id/balai/bbwsnt1";
    };
    const handleDownload = () => {
    const doc = new jsPDF();

        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text("BUKTI PENGISIAN SURVEI", 105, 20, { align: "center" });

        doc.setFontSize(13);
        doc.text("KEPUASAN MASYARAKAT", 105, 28, { align: "center" });

        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        doc.text("Balai Besar Wilayah Sungai Nusa Tenggara I Mataram", 105, 36, { align: "center" });

        doc.line(20, 42, 190, 42);

        const formatTanggal = (tanggal: string) => {
            if (!tanggal) return "-";

            return new Date(tanggal).toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            });
        };
        const data = [
            ["Nama Pelapor", survey.nama],
            ["No. HP", survey.no_hp],
            ["Tanggal Kunjungan", formatTanggal(survey.tanggal_kunjungan)],
            ["Jenis Pelayanan", survey.jenis_pelayanan],
        ];

        let y = 55;

        data.forEach(([label, value]) => {
            doc.text(`${label}`, 20, y);
            doc.text(`: ${value || "-"}`, 70, y);
            y += 10;
        });

        doc.line(20, y + 2, 190, y + 2);

        doc.text("Terima kasih atas partisipasi Anda.", 20, y + 15);
        doc.text("Dokumen ini merupakan bukti bahwa Anda telah", 20, y + 25);
        doc.text("mengisi Survei Kepuasan Masyarakat.", 20, y + 32);

        doc.setFontSize(10);
        doc.text(`Dicetak: ${new Date().toLocaleString("id-ID")}`, 20, y + 48);

        const pdfUrl = doc.output("bloburl"); window.open(pdfUrl, "_blank", "noopener,noreferrer");
    };

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
                    <div className="p-16 bg-white shadow rounded-xl border mt-32">
                        <div className="text-center text-3xl font-bold">Terima Kasih</div>
                        <div className="text-center font-medium mt-8">Terima kasih sudah ikut berpartisipasi dalam meningkatkan kualitas pelayanan<br /> Balai Besar Wilayah Sungai Nusa Tenggara I Mataram</div>

                        <div className="flex justify-center gap-4 mt-8">
                            <button
                                type="button"
                                onClick={handleDownload}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition duration-200"
                            >
                                Unduh Bukti Pengisian
                            </button>
                            
                            <button
                                type="button"
                                onClick={handleBack}
                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition duration-200"
                            >
                                Kembali ke Web BBWS NT I Mataram
                            </button>

                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}