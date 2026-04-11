import { useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- Tambahan: Untuk pindah halaman
import logoBrand from "/public/Foodwiseicons.png"; 
import { MdOutlineEmail } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";

export default function Authentication() {
  const [activeTab, setActiveTab] = useState("signin");
  const navigate = useNavigate(); // <-- Inisialisasi fungsi navigasi

  const [formData, setFormData] = useState({
    namaLengkap: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Tentukan endpoint berdasarkan tab yang aktif
    const endpoint = activeTab === "signin" ? "signin" : "signup";

    try {
      const response = await fetch(`http://localhost:3002/api/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          // namaLengkap: formData.namaLengkap, // Aktifkan jika backend sudah support field nama
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // 1. Simpan token ke localStorage biar awet
        localStorage.setItem("token", data.token);
        
        // 2. Kasih tau user
        alert(activeTab === "signin" ? "Yeay! Login Berhasil!" : "Registrasi Berhasil!");

        // 3. PINDAH KE DASHBOARD
        navigate("/dashboard"); 

        window.location.reload();
      } else {
        alert("Gagal: " + data.error);
      }
    } catch (error) {
      alert("Server mati atau koneksi ditolak (Cek CORS/Backend).");
    }
  };

  return (
    <div className="flex min-h-screen w-full font-sans">
      {/* SISI KIRI: Form Login */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-8 py-16 bg-white">

        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-black mb-2 tracking-wide">
            {activeTab === "signin" ? "Silahkan Login" : "Buat Akun Baru"}
          </h1>
          <p className="text-sm font-bold text-gray-400">
            {activeTab === "signin" ? "silahkan login dengan akun anda" : "daftarkan diri anda untuk mulai"}
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex border-2 border-green-700 rounded-full overflow-hidden mb-10">
          <button
            onClick={() => setActiveTab("signin")}
            className={`px-10 py-1.5 font-bold text-lg transition-all duration-300 outline-none
              ${activeTab === "signin" ? "bg-green-700 text-white" : "bg-white text-green-700 hover:bg-green-50"}`}
          >
            sign in
          </button>
          <button
            onClick={() => setActiveTab("signup")}
            className={`px-10 py-1.5 font-bold text-lg transition-all duration-300 outline-none
              ${activeTab === "signup" ? "bg-green-700 text-white" : "bg-white text-green-700 hover:bg-green-50"}`}
          >
            sign up
          </button>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full max-w-[320px]">
          
          {activeTab === "signup" && (
            <div className="flex items-center border border-gray-500 rounded-lg h-12 bg-white overflow-hidden focus-within:border-green-600 transition-all">
              <div className="w-12 h-full flex-shrink-0 flex items-center justify-center text-gray-500">
                <FaRegUser className="text-lg" />
              </div>
              <div className="h-6 w-[1px] bg-gray-400"></div>
              <input
                type="text"
                name="namaLengkap"
                placeholder="Nama lengkap"
                required={activeTab === "signup"}
                value={formData.namaLengkap}
                onChange={handleChange}
                className="flex-1 h-full px-4 outline-none text-sm text-gray-700 font-medium"
              />
            </div>
          )}

          <div className="flex items-center border border-gray-500 rounded-lg h-12 bg-white overflow-hidden focus-within:border-green-600 transition-all">
            <div className="w-12 h-full flex-shrink-0 flex items-center justify-center text-gray-500">
              <MdOutlineEmail className="text-xl" />
            </div>
            <div className="h-6 w-[1px] bg-gray-400"></div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleChange}
              className="flex-1 h-full px-4 outline-none text-sm text-gray-700 font-medium"
            />
          </div>

          <div className="flex items-center border border-gray-500 rounded-lg h-12 bg-white overflow-hidden focus-within:border-green-600 transition-all">
            <div className="w-12 h-full flex-shrink-0 flex items-center justify-center text-gray-500">
              <CiLock className="text-xl font-bold" />
            </div>
            <div className="h-6 w-[1px] bg-gray-400"></div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
              className="flex-1 h-full px-4 outline-none text-sm text-gray-700 font-medium"
            />
          </div>

          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="bg-[#85b991] hover:bg-[#6ba077] text-white font-bold text-xl py-2.5 px-12 rounded-full transition-all duration-200 shadow-sm active:scale-95"
            >
              Continue
            </button>
          </div>
        </form>
      </div>

      {/* SISI KANAN: Branding */}
      <div className="hidden lg:flex w-1/2 bg-[#1b5e3a] flex-col items-center justify-center px-16 text-center">
        <div className="flex flex-col items-center mb-8">
          <img src={logoBrand} alt="FoodWise Logo" className="w-80 h-auto object-contain" />
        </div>
        <p className="text-white text-[1.1rem] leading-relaxed max-w-md font-medium tracking-wide italic">
          “Mulai kebiasa baru yang lebih sehat untuk dirimu dan lingkungan dengan memantau makananmu”
        </p>
      </div>
    </div>
  );
}