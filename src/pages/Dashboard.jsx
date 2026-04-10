import React, { useState, useEffect } from 'react'
import CardProduct from '../component/Dashboard/CardProduct'
import { Progress } from "flowbite-react";

export default function Dashboard() {
  // State untuk menyimpan total poin user yang dibaca dari localStorage
  const [totalPoint, setTotalPoint] = useState(0);

  // State untuk menyimpan data fermentasi yang dihitung dari localStorage
  const [fermentasiData, setFermentasiData] = useState([
    { id: 1, nama: "Bokashi", kg: 0, status: "Sedang di Fermentasi" },
    { id: 2, nama: "Kompos", kg: 0, status: "Sedang di Fermentasi" },
    { id: 3, nama: "Eco-enzyme", kg: 0, status: "Sedang di Fermentasi" },
  ]);

  // State untuk menyimpan total sampah terkumpul
  const [sampahTotalKg, setSampahTotalKg] = useState(0);

  // Fungsi untuk membaca data dan menghitung total dari localStorage
  // Dijalankan ketika component pertama kali ditampilkan
  useEffect(() => {
    // ========== HITUNG POIN ==========
    // Ambil total poin dari localStorage, default 0 jika belum ada
    const storedPoints = parseInt(localStorage.getItem("totalPoints")) || 0;
    
    // Simpan poin ke state
    setTotalPoint(storedPoints);

    // ========== HITUNG SAMPAH ==========
    // Ambil data journals dari localStorage
    const journalsData = JSON.parse(localStorage.getItem("journals")) || [];

    // Buat object untuk menampung total sampah per kategori
    const fermentasiTotals = {
      "Bokashi": 0,      // Total berat bokashi
      "Kompos": 0,       // Total berat kompos
      "Eco-enzyme": 0,   // Total berat eco-enzyme
    };

    // Loop setiap jurnal yang tersimpan
    journalsData.forEach((journal) => {
      // Ambil kategori dari journal
      const kategori = journal.kategori;
      
      // Ambil berat sampah
      const berat = journal.berat;
      
      // Ambil satuan berat (gr atau kg)
      const satuan = journal.satuan;

      // Ubah berat menjadi kg jika satuannya gr
      // Jika satuan = "gr", maka bagi 1000 untuk menjadi kg
      // Misal: 500 gr = 500 / 1000 = 0.5 kg
      const beratKg = satuan === "gr" ? berat / 1000 : berat;

      // Tambahkan berat ke kategori yang sesuai
      if (fermentasiTotals[kategori] !== undefined) {
        fermentasiTotals[kategori] += beratKg;
      }
    });

    // Hitung total sampah dari semua kategori
    const totalSampah = fermentasiTotals["Bokashi"] + fermentasiTotals["Kompos"] + fermentasiTotals["Eco-enzyme"];

    // Update state fermentasiData dengan nilai yang dihitung
    setFermentasiData([
      { id: 1, nama: "Bokashi", kg: fermentasiTotals["Bokashi"], status: "Sedang di Fermentasi" },
      { id: 2, nama: "Kompos", kg: fermentasiTotals["Kompos"], status: "Sedang di Fermentasi" },
      { id: 3, nama: "Eco-enzyme", kg: fermentasiTotals["Eco-enzyme"], status: "Sedang di Fermentasi" },
    ]);

    // Update state total sampah
    setSampahTotalKg(totalSampah);
  }, []); // [] berarti effect hanya dijalankan sekali saat component mount

  // Data produk dalam array - gambar dikosongkan karena belum tersedia
  const produkData = [
    { id: 1, nama: "Nama produk", gambar: "" },
    { id: 2, nama: "Nama produk", gambar: "" },
    { id: 3, nama: "Nama produk", gambar: "" },
  ];

  // Hitung persentase sampah untuk progress bar
  // maxKg adalah target maksimal sampah yang ingin dikumpulkan
  const maxKg = 1000;
  const persentaseSampah = (sampahTotalKg / maxKg) * 100; // Hitung persentase untuk progress bar

  return (
    // Wrapper utama: lebar maksimal 480px, tengah layar, padding, background putih
    <div className="w-10/12 mx-auto p-5 bg-white min-h-screen">
      {/* ==============================
          SECTION JURNAL FOODWISE
      ============================== */}
      <h2 className="text-lg font-bold mb-4">Jurnal FoodWise &gt;&gt;</h2>

      {/* --- Baris atas: Kartu Total Point & Kartu Sampah Terkumpul --- */}
      <div className="flex gap-3 mb-4">
        <div className="border border-gray-300 rounded-sm shadow-sm w-full md:w-64">
          <h2 className="text-sm font-bold border-b border-gray-300 px-4 py-2">
            Total Point
          </h2>
          <div className="flex justify-between items-center px-4 py-6">
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold">{totalPoint}</span>
              <span className="text-xs font-bold mt-1">Point</span>
            </div>
            <div className="relative w-20 h-20">
              <svg
                viewBox="0 0 24 24"
                className="w-12 h-12 text-yellow-300 absolute bottom-0 left-0 drop-shadow-md"
                fill="#FDE047"
                stroke="#EAB308"
                strokeWidth="0.5"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <svg
                viewBox="0 0 24 24"
                className="w-16 h-16 text-yellow-400 absolute top-0 right-0 z-10 drop-shadow-md"
                fill="#FACC15"
                stroke="#CA8A04"
                strokeWidth="0.5"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Kartu Sampah Terkumpul */}
        <div className="flex-1 border border-gray-300 rounded-lg p-3">
          {/* Judul kartu */}
          <p className="text-xl text-center mb-2">Sampah terkumpul</p>

          {/* Angka kg sampah yang dihitung dari localStorage */}
          <p className="text-2xl font-bold mb-2">{sampahTotalKg.toFixed(2)} Kg</p>

          {/* Baris ikon daun + progress bar */}
          <div className="flex items-center gap-2">
            {/* Ikon daun */}
            <span className="text-2xl">🌱</span>

            {/* Progress bar dari flowbite-react */}
            <div className="flex-1">
              <Progress
                progress={persentaseSampah} // Nilai progress 0-100 berdasarkan perhitungan
                color="green" // Warna hijau
                size="xl" // Ukuran kecil
              />
            </div>
          </div>
        </div>
      </div>
      {/* --- Akhir baris atas --- */}

      {/* --- Baris bawah: Kartu Fermentasi (Bokashi, Kompos, Eco-enzyme) --- */}
      <div className="flex gap-2 mb-8">
        {/* Loop data fermentasi menggunakan map */}
        {fermentasiData.map((item) => (
          <div
            key={item.id} // Key unik wajib ada saat menggunakan map
            className="flex-1 border border-gray-300 rounded-lg overflow-hidden"
            // overflow-hidden agar header hijau mengikuti border-radius kartu
          >
            {/* Header hijau berisi nama fermentasi */}
            <div className="bg-green-500 py-2 text-center">
              <p className="text-white text-xs font-bold">{item.nama}</p>
            </div>

            {/* Body kartu: berat dan status */}
            <div className="p-2 py-10 text-center">
              {/* Angka berat */}
              <p className="text-xl font-bold my-1">{item.kg} Kg</p>
            </div>
          </div>
        ))}
      </div>
      {/* --- Akhir baris fermentasi --- */}

      {/* ==============================
          SECTION PRODUK KAMI
      ============================== */}
      <h2 className="text-lg font-bold mb-4">Produk kami &gt;&gt;</h2>

      {/* Grid 3 kolom untuk kartu produk */}
      <div className="flex gap-3 mx-auto">
        {/* Loop data produk menggunakan map */}
        {produkData.map((item) => (
          <div
            key={item.id} // Key unik wajib ada saat menggunakan map
            className="flex-1 flex flex-col items-center"
          >
            {/* Area gambar produk */}
            {item.gambar ? (
              // Jika gambar tersedia, tampilkan gambar
              <img
                src={item.gambar}
                alt={item.nama}
                className="w-full aspect-square object-cover rounded-lg mb-2"
                // aspect-square menjaga gambar tetap berbentuk persegi
              />
            ) : (
              // Jika gambar tidak ada, tampilkan placeholder abu-abu
              <div className="w-full aspect-square bg-gray-300 rounded-lg mb-2" />
            )}

            {/* Nama produk di bawah gambar */}
            <p className="text-xs text-gray-600 text-center">{item.nama}</p>
          </div>
        ))}
      </div>
      {/* --- Akhir grid produk --- */}
    </div>
    // Akhir wrapper utama
  );
}
