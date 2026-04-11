import { useState, useEffect } from "react"; // Import useState dan useEffect untuk mengelola state dan side effects
import { useNavigate } from "react-router-dom"; // Import useNavigate untuk redirect
import logoBrand from "/public/Foodwiseicons.png";
import { MdOutlineEmail } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { useAuth } from "../context/useAuth"; // Import custom hook untuk auth

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

  // State untuk error message
  const [errorMessage, setErrorMessage] = useState("");

  // Get auth functions dari context
  const { signup, signin, isLoading, user } = useAuth();

  // Hook untuk redirect halaman
  const navigate = useNavigate();

  // Redirect ke dashboard jika user sudah login
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  // Fungsi untuk menangani perubahan input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); // Update nilai field yang berubah
    setErrorMessage(""); // Clear error message saat user mengetik
  };

  // Fungsi untuk menangani submit form
  const handleSubmit = async () => {
    // Reset error message
    setErrorMessage("");

    try {
      // Validasi form
      if (!formData.email || !formData.password) {
        setErrorMessage("Email dan password harus diisi!");
        return;
      }

      if (activeTab === "signin") {
        // Logika login
        const result = await signin(formData.email, formData.password);
        
        if (!result.success) {
          setErrorMessage(result.message);
        } else {
          // Jika berhasil, redirect ke dashboard (dilakukan di useEffect)
        }
      } else {
        // Validasi sign up
        if (!formData.namaLengkap) {
          setErrorMessage("Nama lengkap harus diisi!");
          return;
        }

        // Logika register
        const result = await signup(
          formData.namaLengkap,
          formData.email,
          formData.password
        );

        if (!result.success) {
          setErrorMessage(result.message);
        } else {
          // Jika berhasil, redirect ke dashboard (dilakukan di useEffect)
        }
      }
    } catch (error) {
      setErrorMessage("Terjadi kesalahan: " + error.message);
    }
  };

  // Fungsi untuk ganti tab
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setErrorMessage(""); // Clear error saat ganti tab
    setFormData({ // Reset form saat ganti tab
      namaLengkap: "",
      email: "",
      password: "",
    });
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
          Silahkan {activeTab === "signin" ? "Login" : "Daftar"}
        </h1>
        {/* Subjudul */}
        <p className="text-sm text-gray-500 mb-6">
          {activeTab === "signin"
            ? "Silahkan login dengan akun anda"
            : "Silahkan daftar untuk membuat akun baru"}
        </p>

        {/* Tab Sign In / Sign Up */}
        <div className="flex mb-8">
          {/* Tombol Sign In */}
          <button
            onClick={() => handleTabChange("signin")} // Ganti tab ke signin saat diklik
            className={`px-6 py-2 rounded-l-md border text-sm font-medium transition-all duration-200
              ${
                activeTab === "signin"
                  ? "bg-green-700 text-white border-green-700" // Aktif: hijau gelap
                  : "bg-white text-green-700 border-green-700 hover:bg-green-50" // Tidak aktif: outline
              }`}
          >
            Log In
          </button>

          {/* Tombol Sign Up */}
          <button
            onClick={() => handleTabChange("signup")} // Ganti tab ke signup saat diklik
            className={`px-6 py-2 rounded-r-md border text-sm font-medium transition-all duration-200
              ${
                activeTab === "signup"
                  ? "bg-green-700 text-white border-green-700" // Aktif: hijau gelap
                  : "bg-white text-green-700 border-green-700 hover:bg-green-50" // Tidak aktif: outline
              }`}
          >
            Sign Up
          </button>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {errorMessage}
          </div>
        )}

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
                disabled={isLoading}
                className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent disabled:opacity-50"
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
              disabled={isLoading}
              className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent disabled:opacity-50"
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
              disabled={isLoading}
              className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent disabled:opacity-50"
            />
          </div>

          <div>
            <p className="text-sm text-gray-600">
              {activeTab === "signin"
                ? "Belum punya akun? "
                : "Sudah punya akun? "}
              <button
                onClick={() => handleTabChange(activeTab === "signin" ? "signup" : "signin")}
                className="text-green-500 hover:underline"
                disabled={isLoading}
              >
                {activeTab === "signin" ? "Daftar di sini" : "Login di sini"}
              </button>
            </p>
          </div>

          {/* Tombol Continue / Submit */}
          <button
            onClick={handleSubmit} // Panggil fungsi submit saat diklik
            disabled={isLoading}
            className="mt-2 bg-green-400 hover:bg-green-500 text-white font-semibold py-3 px-8 rounded-full self-start transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Loading..." : "Continue"}
          </button>
        </div>
      </div>

      {/* ========================= */}
      {/* SISI KANAN: Branding Panel */}
      {/* ========================= */}
      <div className="min-h-screen flex w-1/2 bg-green-800 flex-col items-center justify-center px-12 text-center gap-8">
        {/* Logo FoodWise */}
        <div className="flex flex-col items-center gap-4">
          {/* Ikon logo: kombinasi otak dan daun */}
          {/* Lingkaran latar belakang transparan */}
          <div className="flex items-center justify-center">
            {/* SVG ikon otak + daun */}
            <img src={logoBrand} alt="FoodWise Logo" className="w-32 h-16 rounded-full" />
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
          "Mulai kebiasaan baru yang lebih sehat untuk dirimu dan lingkungan
          dengan memantau makananmu"
        </p>
      </div>
    </div>
  );
}

