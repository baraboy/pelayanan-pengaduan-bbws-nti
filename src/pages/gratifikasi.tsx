import {
  loadCaptchaEnginge,
  LoadCanvasTemplateNoReload,
  validateCaptcha,
} from "react-simple-captcha";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import axios from "../libs/axios";
import { useNavigate } from "react-router-dom";
import UploadFile from "../components/upload-file";

export default function Gratifikasi() {
  const navigate = useNavigate();
  const captchaRef = useRef<any>();
  const captchaLength = 6;
  const [formData, setFormData] = useState<any>({
    nama: "",
    jenis_pelaporan: "",
    asal_pelapor: "",
    bukti_dukung: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [jenisPelaporanIsLainnya, setJenisPelaporanIsLainnya] = useState(false);
  const [asalPelaporanIsLainnya, setAsalPelaporanIsLainnya] = useState(false);
  const [valueJenisPelaporanIsLainnya, setValueJenisPelaporanIsLainnya] =
    useState("");
  const [valueAsalPelaporanIsLainnya, setValueAsalPelaporanIsLainnya] =
    useState("");

  useEffect(() => {
    loadCaptchaEnginge(captchaLength);
  }, []);

  useEffect(() => {
    if (formData.jenis_pelaporan == "Lainnya") {
      setJenisPelaporanIsLainnya(true);
    } else {
      setJenisPelaporanIsLainnya(false);
    }

    if (formData.asal_pelapor == "Lainnya") {
      setAsalPelaporanIsLainnya(true);
    } else {
      setAsalPelaporanIsLainnya(false);
    }
  }, [formData]);

  const checkCaptcha = () => {
    let user_captcha = captchaRef.current.value;
    if (validateCaptcha(user_captcha, false) == true) {
      return true;
    } else {
      loadCaptchaEnginge(captchaLength);
      return false;
    }
  };

  const reloadCaptcha = () => {
    loadCaptchaEnginge(captchaLength);
  };

  const handleOnChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!checkCaptcha()) {
      return alert("Captcha Does Not Match");
    }

    setIsLoading(true);
    try {
      let data = { ...formData };
      if (formData.jenis_pelaporan == "Lainnya") {
        data.jenis_pelaporan = valueJenisPelaporanIsLainnya;
      }

      if (formData.asal_pelapor == "Lainnya") {
        data.asal_pelapor = valueAsalPelaporanIsLainnya;
      }

      const res = await axios.post("/api/gratifikasi", data, {
        headers: {
          Authorization: "Basic c3VydmV5c2lzZGE6cGFzczJzaXNkYXN1cnZleQ==",
        },
      });
      console.log("response", res.data);
      navigate("/terima-kasih");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#112980] font-sans relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#0D3084]/50" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[#0D3084]/50" />

      {/* Title Section */}
      <section className="text-white text-center py-12 px-6 relative z-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Kanal Pengaduan Gratifikasi dan Penyuapan BBWS NT I Mataram
        </h1>
        <p className="text-blue-200 max-w-4xl mx-auto text-lg leading-relaxed">
          Laporkan jika anda melihat tindakan gratifikasi dan penyuapan dari
          Pejabat/Pegawai Kepada Tim UPG atau Tim FKAP Balai Besar Wilayah Sungai
          Nusa Tenggara I Mataram
        </p>
      </section>

      {/* Form Section */}
      <section className="pb-20 px-4 relative z-10">
        <div className="max-w-5xl mx-auto bg-[#f8faff] rounded-xl shadow-2xl overflow-hidden">
          <div className="p-8 md:p-12">
            <h2 className="text-[#002d62] text-2xl font-bold text-center mb-10">
              Form Laporan Gratifikasi dan Penyuapan BBWS NT I Mataram
            </h2>

            <form onSubmit={handleOnSubmit} className="space-y-6">
              {/* Nama Lengkap */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nama Lengkap <span className="italic text-gray-500">(opsional)</span>
                </label>
                <input
                  type="text"
                  name="nama"
                  id="nama"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Masukkan nama lengkap anda"
                  onChange={handleOnChange}
                  value={formData.nama}
                />
              </div>

              {/* Grid for Jenis and Asal */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Jenis Pelaporan */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Jenis Pelaporan
                  </label>
                  <select
                    name="jenis_pelaporan"
                    id="jenis_pelaporan"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white"
                    value={formData.jenis_pelaporan}
                    onChange={handleOnChange}
                    required
                  >
                    <option value="">Pilih jenis pelaporan</option>
                    <option value="Penyuapan">Penyuapan</option>
                    <option value="Gratifikasi">Gratifikasi</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>

                  {jenisPelaporanIsLainnya && (
                    <input
                      type="text"
                      className="w-full mt-2 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      placeholder="Sebutkan jenis pelaporan lainnya"
                      onChange={(e) => {
                        setValueJenisPelaporanIsLainnya(e.target.value);
                      }}
                      value={valueJenisPelaporanIsLainnya}
                    />
                  )}
                </div>

                {/* Asal Pelaporan */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Asal Pelaporan
                  </label>
                  <select
                    name="asal_pelapor"
                    id="asal_pelapor"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white"
                    value={formData.asal_pelapor}
                    onChange={handleOnChange}
                    required
                  >
                    <option value="">Pilih asal pelaporan</option>
                    <option value="Pegawai">Pegawai</option>
                    <option value="Masyarakat">Masyarakat</option>
                    <option value="Mitra">Mitra</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>

                  {asalPelaporanIsLainnya && (
                    <input
                      type="text"
                      className="w-full mt-2 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      placeholder="Sebutkan asal pelaporan lainnya"
                      onChange={(e) => {
                        setValueAsalPelaporanIsLainnya(e.target.value);
                      }}
                      value={valueAsalPelaporanIsLainnya}
                    />
                  )}
                </div>
              </div>

              {/* Bukti Dukung */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Bukti Dukung Pelaporan
                </label>
                <UploadFile
                  onChange={(v: any) => {
                    setFormData({
                      ...formData,
                      bukti_dukung: v,
                    });
                  }}
                />
              </div>

              {/* Captcha */}
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Enter Captcha Value
                </label>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={reloadCaptcha}
                    className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                    aria-label="Reload Captcha"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5 text-gray-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.023 9.348h4.992m0 0-1.5-1.5m1.5 1.5-1.5 1.5M7.98 14.652H2.988m0 0 1.5 1.5m-1.5-1.5 1.5-1.5M12 6.75a5.25 5.25 0 0 1 5.25 5.25v.75m-10.5 0V12A5.25 5.25 0 0 1 12 17.25m0 10.5V12A5.25 5.25 0 0 1 7.98 6.75m0 10.5V12a5.25 5.25 0 0 1-5.25 5.25m0 0V6.75a5.25 5.25 0 0 1 5.25-5.25m5.25 5.25H12"
                      />
                    </svg>
                  </button>
                  <LoadCanvasTemplateNoReload />
                </div>
                <input
                  ref={captchaRef}
                  placeholder="Ketik captcha di sini"
                  id="user_captcha_input"
                  name="user_captcha_input"
                  type="text"
                  className="w-full md:w-64 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full md:w-48 bg-[#0047ba] hover:bg-[#00368e] disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:-translate-y-0.5 transition-all active:scale-95"
                >
                  {isLoading ? "Loading..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
