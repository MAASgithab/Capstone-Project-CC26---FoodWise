import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Jurnal() {
  // State untuk menyimpan nilai setiap field form
  const [formData, setFormData] = useState({
    aktivitas: "Masak",    // Pilihan masak atau makan
    bersisa: "Ya",         // Apakah makanan bersisa
    tindakan: "Kompos",    // Apa yang dilakukan dengan sisa makanan
    jam: "",               // Jam selesai makan (HH:MM)
    jamPeriode: "PM",      // AM atau PM
    berat: "50",           // Berat makanan
    beratSatuan: "kg",     // Satuan berat (gr atau kg)
  });

  // State untuk menyimpan kategori dari API
  const [categories, setCategories] = useState([]);
  
  // State untuk menampilkan loading saat fetch
  const [isLoading, setIsLoading] = useState(false);
  
  // State untuk menyimpan pesan error
  const [error, setError] = useState(null);
  
  // Hook untuk navigasi halaman (redirect jika belum login)
  const navigate = useNavigate();

  // Fungsi untuk mengecek apakah user sudah login
  // Dijalankan ketika component pertama kali ditampilkan
  useEffect(() => {
    // Ambil token dari localStorage untuk melihat apakah user sudah login
    const token = localStorage.getItem("token");
    
    // Jika tidak ada token, redirect ke halaman login
    if (!token) {
      alert("Anda harus login terlebih dahulu!");
      navigate("/"); // Redirect ke halaman utama
      return;
    }

    // Fetch kategori dari API
    fetchCategories(token);
  }, []); // [] berarti function hanya dijalankan sekali saat component mount

  // Fungsi untuk mengambil data kategori dari API
  const fetchCategories = async (token) => {
    try {
      // Buat request GET ke endpoint API untuk mengambil kategori
      const response = await fetch("http://localhost:3000/api/categories", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`, // Kirim token untuk autentikasi
          "Content-Type": "application/json", // Tipe data yang dikirim
        },
      });

      // Cek apakah response berhasil (status 200-299)
      if (!response.ok) {
        throw new Error("Gagal mengambil kategori");
      }

      // Ubah response JSON menjadi object JavaScript
      const data = await response.json();
      
      // Simpan kategori ke state
      setCategories(data.data || []); // Simpan data.data atau array kosong jika tidak ada
    } catch (err) {
      // Jika terjadi error, tampilkan pesan error
      console.error("Error fetching categories:", err);
      setError("Gagal mengambil data kategori");
    }
  };

  // Fungsi untuk mengupdate state ketika user mengubah nilai field
  const handleChange = (e) => {
    const { name, value } = e.target; // Ambil name dan value dari elemen yang diubah
    setFormData((prev) => ({
      ...prev,       // Salin semua state sebelumnya
      [name]: value, // Update hanya field yang diubah
    }));
  };

  // Fungsi untuk mereset form ke nilai awal
  const handleReset = (e) => {
    e.preventDefault(); // Mencegah behavior default browser
    setFormData({
      aktivitas: "Masak",
      bersisa: "Ya",
      tindakan: "Kompos",
      jam: "",
      jamPeriode: "PM",
      berat: "",
      beratSatuan: "kg",
    });
  };

  // Fungsi untuk handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah halaman refresh saat submit
    
    // Ambil token dari localStorage untuk autentikasi ke API
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Session expired, silakan login kembali!");
      navigate("/");
      return;
    }

    // Mulai loading
    setIsLoading(true);
    setError(null);

    try {
      // Cari kategori berdasarkan nama tindakan
      // Misalnya: jika tindakan = "Kompos", maka cari kategori dengan nama "Kompos"
      const selectedCategory = categories.find(
        (cat) => cat.name === formData.tindakan
      );

      // Jika kategori tidak ditemukan
      if (!selectedCategory) {
        setError("Kategori tidak ditemukan");
        setIsLoading(false);
        return;
      }

      // Konversi berat ke format yang dibutuhkan API
      // Jika satuan adalah "gr", ubah ke "kg" dengan membagi 1000
      const wasteWeight = parseFloat(formData.berat);
      const weightUnit = formData.beratSatuan;

      // Persiapkan data untuk dikirim ke API
      const requestData = {
        activity: formData.aktivitas.toLowerCase(), // "Masak" -> "masak"
        has_leftover: formData.bersisa === "Ya", // Ubah "Ya"/"Tidak" menjadi boolean
        category_id: selectedCategory.id, // ID kategori berdasarkan tindakan
        finished_at: formData.jam || null, // Waktu selesai makan
        waste_weight: wasteWeight, // Berat sampah
        weight_unit: weightUnit, // Satuan berat
      };

      // Kirim data ke API menggunakan fetch POST
      const response = await fetch("http://localhost:3000/api/journals", {
        method: "POST", // Metode HTTP POST untuk menambah data baru
        headers: {
          "Authorization": `Bearer ${token}`, // Kirim token untuk autentikasi
          "Content-Type": "application/json", // Tipe data yang dikirim
        },
        body: JSON.stringify(requestData), // Ubah requestData menjadi string JSON
      });

      // Cek apakah response berhasil
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal menyimpan jurnal");
      }

      // Ubah response JSON menjadi object JavaScript
      const resultData = await response.json();

      // Siapkan data yang akan disimpan ke localStorage
      const journalEntry = {
        id: resultData.data.id, // ID dari API
        kategori: selectedCategory.name, // Nama kategori/tindakan
        berat: wasteWeight, // Berat sampah
        satuan: weightUnit, // Satuan berat
        waktu: formData.jam, // Waktu selesai makan
        aktivitas: formData.aktivitas, // Aktivitas (Masak/Makan)
        tanggal: new Date().toISOString(), // Tanggal dan waktu saat ini
      };

      // Ambil data jurnal yang sudah ada di localStorage
      const existingJournals = JSON.parse(localStorage.getItem("journals")) || [];
      
      // Tambahkan data jurnal baru ke array
      existingJournals.push(journalEntry);
      
      // Simpan array ke localStorage dengan key "journals"
      localStorage.setItem("journals", JSON.stringify(existingJournals));

      // Tambahkan poin ke user setiap kali submit jurnal
      // Ambil total poin yang sudah ada dari localStorage, default 0 jika belum ada
      const currentPoints = parseInt(localStorage.getItem("totalPoints")) || 0;
      
      // Tambahkan 5 poin setiap kali submit jurnal
      const newPoints = currentPoints + 5;
      
      // Simpan poin yang sudah diupdate ke localStorage dengan key "totalPoints"
      localStorage.setItem("totalPoints", newPoints.toString());

      // Tampilkan notifikasi sukses
      alert("Jurnal berhasil disimpan! +5 poin");
      
      // Reset form ke nilai awal
      handleReset(e);
    } catch (err) {
      // Jika terjadi error, tampilkan pesan error
      console.error("Error submitting journal:", err);
      setError(err.message);
      alert(`Error: ${err.message}`);
    } finally {
      // Selesai loading
      setIsLoading(false);
    }
  };

  // Fungsi untuk handle cancel
  const handleCancel = (e) => {
    e.preventDefault(); // Mencegah behavior default browser
    
    // Tampilkan konfirmasi ke user
    if (window.confirm("Anda yakin ingin membatalkan?")) {
      alert("Dibatalkan!"); // Notifikasi ke user
      
      // Reset form ke nilai awal
      handleReset(e);
      
      // Kembali ke halaman dashboard
      navigate("/dashboard");
    }
  };

  return (
    // Container utama dengan styling card putih menggunakan TailwindCSS
    <div className="max-w-xl mx-auto mt-10 bg-white rounded-lg shadow-md p-6">

      {/* Tampilkan pesan error jika ada */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Tag form HTML sebagai wrapper semua input */}
      <form onSubmit={handleSubmit}>

        {/* ========== PERTANYAAN 1 ========== */}
        <div className="mb-4">
          {/* Label untuk dropdown aktivitas */}
          <label
            htmlFor="aktivitas"
            className="block text-base font-bold text-black mb-1"
          >
            Apa anda masak atau makan hari ini?
          </label>

          {/* Dropdown HTML native untuk pilihan Masak atau Makan */}
          <select
            id="aktivitas"
            name="aktivitas"
            value={formData.aktivitas}
            onChange={handleChange}
            className="w-36 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
          >
            <option value="Masak">Masak</option>
            <option value="Makan">Makan</option>
          </select>
        </div>

        {/* ========== PERTANYAAN 2 ========== */}
        <div className="mb-4">
          {/* Label untuk dropdown bersisa */}
          <label
            htmlFor="bersisa"
            className="block text-base font-bold text-black mb-1"
          >
            Apa makanan anda bersisa?
          </label>

          {/* Dropdown HTML native untuk pilihan Ya atau Tidak */}
          <select
            id="bersisa"
            name="bersisa"
            value={formData.bersisa}
            onChange={handleChange}
            className="w-36 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
          >
            <option value="Ya">Ya</option>
            <option value="Tidak">Tidak</option>
          </select>
        </div>

        {/* ========== PERTANYAAN 3 ========== */}
        <div className="mb-4">
          {/* Label untuk dropdown tindakan */}
          <label
            htmlFor="tindakan"
            className="block text-base font-bold text-black mb-1"
          >
            Anda apakan dengan makanan yang bersisa?
          </label>

          {/* Dropdown yang menampilkan kategori dari API */}
          {categories.length > 0 ? (
            <select
              id="tindakan"
              name="tindakan"
              value={formData.tindakan}
              onChange={handleChange}
              className="w-36 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
            >
              {/* Iterasi setiap kategori dari API dan tampilkan sebagai option */}
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          ) : (
            // Jika kategori masih loading atau kosong, tampilkan dropdown static
            <select
              id="tindakan"
              name="tindakan"
              value={formData.tindakan}
              onChange={handleChange}
              className="w-36 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
            >
              <option value="Kompos">Kompos</option>
              <option value="Bokashi">Bokashi</option>
              <option value="Eco-Enzym">Eco-Enzym</option>
            </select>
          )}
        </div>

        {/* ========== PERTANYAAN 4 ========== */}
        <div className="mb-4">
          {/* Label untuk input jam */}
          <label
            htmlFor="jam"
            className="block text-base font-bold text-black mb-1"
          >
            pukul berapa anda selesai makan?
          </label>

          {/* Baris input jam dan dropdown AM/PM sejajar menggunakan flexbox */}
          <div className="flex items-center gap-2">
            {/* Input teks HTML native untuk jam format HH:MM */}
            <input
              id="jam"
              type="time"
              name="jam"
              placeholder="HH:MM"
              value={formData.jam}
              onChange={handleChange}
              className="w-32 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>
        </div>

        {/* ========== PERTANYAAN 5 ========== */}
        <div className="mb-6">
          {/* Label untuk input berat */}
          <label
            htmlFor="berat"
            className="block text-base font-bold text-black mb-1"
          >
            Berapa beratnya (gr/kg)
          </label>

          {/* Baris input berat dan dropdown satuan sejajar menggunakan flexbox */}
          <div className="flex items-center gap-2">
            {/* Input number HTML native untuk berat */}
            <input
              id="berat"
              type="number"
              name="berat"
              value={formData.berat}
              onChange={handleChange}
              className="w-32 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
            />

            {/* Dropdown HTML native untuk pilihan satuan berat */}
            <select
              name="beratSatuan"
              value={formData.beratSatuan}
              onChange={handleChange}
              className="w-20 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
            >
              <option value="gr">gr</option>
              <option value="kg">kg</option>
            </select>
          </div>
        </div>

        {/* ========== TOMBOL AKSI ========== */}
        {/* Baris tombol Cancel, Reset, dan Submit sejajar */}
        <div className="flex justify-between gap-3 mt-40">

          {/* Tombol Cancel dengan warna merah */}
          <button
            onClick={handleCancel}
            disabled={isLoading} // Disable tombol saat loading
            className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>

          {/* Tombol Reset dengan warna abu-abu */}
          <button
            onClick={handleReset}
            disabled={isLoading} // Disable tombol saat loading
            className="w-full py-2 px-4 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded cursor-pointer disabled:opacity-50"
          >
            Reset
          </button>

          {/* Tombol Submit dengan warna hijau gelap, type submit untuk trigger onSubmit form */}
          <button
            type="submit"
            disabled={isLoading} // Disable tombol saat loading
            className="w-full py-2 px-4 bg-green-800 hover:bg-green-900 text-white font-bold rounded cursor-pointer disabled:opacity-50"
          >
            {isLoading ? "Menyimpan..." : "Submit"} {/* Tampilkan teks berbeda saat loading */}
          </button>

        </div>
      </form>
    </div>
  );
}
