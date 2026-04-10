import React, { useState } from "react";

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
  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah halaman refresh saat submit
    console.log("Data yang dikirim:", formData); // Tampilkan data di console
    alert("Data berhasil disimpan!"); // Notifikasi ke user
  };

  // Fungsi untuk handle cancel
  const handleCancel = (e) => {
    e.preventDefault(); // Mencegah behavior default browser
    alert("Dibatalkan!"); // Notifikasi ke user
  };

  return (
    // Container utama dengan styling card putih menggunakan TailwindCSS
    <div className="max-w-xl mx-auto mt-10 bg-white rounded-lg shadow-md p-6">

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

          {/* Dropdown HTML native untuk pilihan tindakan sisa makanan */}
          <select
            id="tindakan"
            name="tindakan"
            value={formData.tindakan}
            onChange={handleChange}
            className="w-36 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
          >
            <option value="Kompos">Kompos</option>
            <option value="Buang">Bokashi</option>
            <option value="Simpan">Eco-Enzym</option>
            <option value="Berikan">Buang</option>
          </select>
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
            className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded cursor-pointer"
          >
            Cancel
          </button>

          {/* Tombol Reset dengan warna abu-abu */}
          <button
            onClick={handleReset}
            className="w-full py-2 px-4 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded cursor-pointer"
          >
            Reset
          </button>

          {/* Tombol Submit dengan warna hijau gelap, type submit untuk trigger onSubmit form */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-800 hover:bg-green-900 text-white font-bold rounded cursor-pointer"
          >
            Submit
          </button>

        </div>
      </form>
    </div>
  );
}
