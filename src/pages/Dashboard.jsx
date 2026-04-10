import React from 'react'
import CardProduct from '../component/Dashboard/CardProduct'
import { Progress } from "flowbite-react";

export default function Dashboard() {
  const totalPoint = 87;

  // Data untuk kartu sampah terkumpul
  const sampahKg = 0;
  const maxKg = 1000;
  const persentaseSampah = (sampahKg / maxKg) * 100; // Hitung persentase untuk progress bar

  // Data fermentasi dalam array agar mudah di-render dengan map
  const fermentasiData = [
    { id: 1, nama: "Bokashi", kg: 3, status: "Sedang di Fermentasi" },
    { id: 2, nama: "Kompos", kg: 50, status: "Sedang di Fermentasi" },
    { id: 3, nama: "Eco-enzyme", kg: 11, status: "Sedang di Fermentasi" },
  ];

  // Data produk dalam array - gambar dikosongkan karena belum tersedia
  const produkData = [
    { id: 1, nama: "Nama produk", gambar: "" },
    { id: 2, nama: "Nama produk", gambar: "" },
    { id: 3, nama: "Nama produk", gambar: "" },
  ];

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

          {/* Angka kg sampah */}
          <p className="text-2xl font-bold mb-2">{sampahKg} Kg</p>

          {/* Baris ikon daun + progress bar */}
          <div className="flex items-center gap-2">
            {/* Ikon daun */}
            <span className="text-2xl">🌱</span>

            {/* Progress bar dari flowbite-react */}
            <div className="flex-1">
              <Progress
                progress={persentaseSampah} // Nilai progress 0-100
                color="green" // Warna hijau
                size="sm" // Ukuran kecil
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
            <div className="p-2 text-center">
              {/* Angka berat */}
              <p className="text-xl font-bold my-1">{item.kg} Kg</p>
              {/* Status fermentasi */}
              <p className="text-xs text-gray-500">{item.status}</p>
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
      <div className="flex gap-3">
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
