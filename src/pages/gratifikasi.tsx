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
      <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-[#0D3084]/30" />
      <div className="absolute -bottom-32 -left-32 w-[600px] h-[600px] rounded-full bg-[#0D3084]/30" />

      {/* Title Section */}
      <section className="text-white text-center py-12 px-6 relative z-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Kanal Pengaduan Gratifikasi dan Penyuapan BBWS NT I Mataram
        </h1>
        <p className="text-blue-200 max-w-4xl mx-auto text-lg leading-relaxed">
          Laporkan jika anda melihat tindakan gratifikasi dan penyuapan dari
          Pejabat/Pegawai Kepada Tim UPG atau Tim FKAP Balai Besar Wilayah
          Sungai Nusa Tenggara I Mataram
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
                  Nama Lengkap{" "}
                  <span className="italic text-gray-500">(opsional)</span>
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
                      x="0px"
                      y="0px"
                      width="100"
                      height="100"
                      viewBox="0 0 30 30"
                    >
                      <path d="M 15 3 C 12.031398 3 9.3028202 4.0834384 7.2070312 5.875 A 1.0001 1.0001 0 1 0 8.5058594 7.3945312 C 10.25407 5.9000929 12.516602 5 15 5 C 20.19656 5 24.450989 8.9379267 24.951172 14 L 22 14 L 26 20 L 30 14 L 26.949219 14 C 26.437925 7.8516588 21.277839 3 15 3 z M 4 10 L 0 16 L 3.0507812 16 C 3.562075 22.148341 8.7221607 27 15 27 C 17.968602 27 20.69718 25.916562 22.792969 24.125 A 1.0001 1.0001 0 1 0 21.494141 22.605469 C 19.74593 24.099907 17.483398 25 15 25 C 9.80344 25 5.5490109 21.062074 5.0488281 16 L 8 16 L 4 10 z"></path>
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
