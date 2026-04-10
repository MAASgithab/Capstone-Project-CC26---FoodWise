import { useState } from "react"; // Import useState untuk mengelola state komponen
import logoBrand from "/public/Foodwiseicons.png";
import { MdOutlineEmail } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";

// Komponen utama halaman Authentication
export default function Authentication() {
  // State untuk menyimpan tab aktif: "signin" atau "signup"
  const [activeTab, setActiveTab] = useState("signin");

  // State untuk menyimpan nilai input form
  const [formData, setFormData] = useState({
    namaLengkap: "", // Hanya digunakan saat sign up
    email: "",
    password: "",
  });

  // Fungsi untuk menangani perubahan input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); // Update nilai field yang berubah
  };

  // Fungsi untuk menangani submit form
  const handleSubmit = () => {
    if (activeTab === "signin") {
      // Logika login di sini
      console.log("Login dengan:", formData.email, formData.password);
    } else {
      // Logika register di sini
      console.log(
        "Daftar dengan:",
        formData.namaLengkap,
        formData.email,
        formData.password,
      );
    }
  };

  return (
    // Wrapper utama: full layar, flex baris (kiri + kanan)
    <div className="flex min-h-screen w-full">
      {/* ===================== */}
      {/* SISI KIRI: Form Login */}
      {/* ===================== */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-12 py-16 bg-white">
        {/* Judul halaman */}
        <h1 className="text-3xl font-bold text-gray-900 mb-1">
          Silahkan Login
        </h1>
        {/* Subjudul */}
        <p className="text-sm text-gray-500 mb-6">
          silahkan login dengan akun anda
        </p>

        {/* Tab Sign In / Sign Up */}
        <div className="flex gap-2 mb-8">
          {/* Tombol Sign In */}
          <button
            onClick={() => setActiveTab("signin")} // Ganti tab ke signin saat diklik
            className={`px-6 py-2 rounded-full border text-sm font-medium transition-all duration-200
              ${
                activeTab === "signin"
                  ? "bg-green-700 text-white border-green-700" // Aktif: hijau gelap
                  : "bg-white text-green-700 border-green-700 hover:bg-green-50" // Tidak aktif: outline
              }`}
          >
            sign in
          </button>

          {/* Tombol Sign Up */}
          <button
            onClick={() => setActiveTab("signup")} // Ganti tab ke signup saat diklik
            className={`px-6 py-2 rounded-full border text-sm font-medium transition-all duration-200
              ${
                activeTab === "signup"
                  ? "bg-green-700 text-white border-green-700" // Aktif: hijau gelap
                  : "bg-white text-green-700 border-green-700 hover:bg-green-50" // Tidak aktif: outline
              }`}
          >
            sign up
          </button>
        </div>

        {/* ===================== */}
        {/* FORM INPUT            */}
        {/* ===================== */}
        <div className="flex flex-col gap-4 max-w-sm">
          {/* Field Nama Lengkap - hanya muncul saat tab signup aktif */}
          {activeTab === "signup" && (
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-3 gap-3">
              {/* Ikon user */}
              <FaRegUser />
              {/* Garis pemisah vertikal */}
              <div className="w-px h-5 bg-gray-300" />
              {/* Input nama lengkap */}
              <input
                type="text"
                name="namaLengkap"
                placeholder="Nama lengkap"
                value={formData.namaLengkap}
                onChange={handleChange}
                className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
              />
            </div>
          )}

          {/* Field Email */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-3 gap-3">
            {/* Ikon email */}
            <MdOutlineEmail />
            {/* Garis pemisah vertikal */}
            <div className="w-px h-5 bg-gray-300" />
            {/* Input email */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
            />
          </div>

          {/* Field Password */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-3 gap-3">
            {/* Ikon gembok */}
            <CiLock />
            {/* Garis pemisah vertikal */}
            <div className="w-px h-5 bg-gray-300" />
            {/* Input password */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
            />
          </div>

          {/* Tombol Continue / Submit */}
          <button
            onClick={handleSubmit} // Panggil fungsi submit saat diklik
            className="mt-2 bg-green-400 hover:bg-green-500 text-white font-semibold py-3 px-8 rounded-full self-start transition-colors duration-200"
          >
            Continue
          </button>
        </div>
      </div>

      {/* ========================= */}
      {/* SISI KANAN: Branding Panel */}
      {/* ========================= */}
      <div className="hidden lg:flex w-1/2 bg-green-800 flex-col items-center justify-center px-12 text-center gap-8">
        {/* Logo FoodWise */}
        <div className="flex flex-col items-center gap-4">
          {/* Ikon logo: kombinasi otak dan daun */}
          <div className="relative w-24 h-24 flex items-center justify-center">
            {/* Lingkaran latar belakang transparan */}
            <div className="flex items-center justify-center">
              {/* SVG ikon otak + daun */}
              <img src={logoBrand} alt="FoodWise Logo" className="w-64 h-16 rounded-full" />
            </div>
          </div>
          {/* Teks logo FoodWise */}
          <div className="text-3xl font-bold">
            {/* "Food" berwarna putih, "Wise" berwarna hijau muda */}
            <span className="text-white">Food</span>
            <span className="text-green-300">Wise</span>
          </div>
        </div>
        {/* Tagline / kutipan motivasi */}
        <p className="text-white text-lg leading-relaxed max-w-xs">
          "Mulai kebiasa baru yang lebih sehat untuk dirimu dan lingkungan
          dengan memantau makananmu"
        </p>
      </div>
    </div>
  );
}
