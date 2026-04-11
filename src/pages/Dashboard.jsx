import React, { useState, useEffect } from 'react'
import { Progress } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [totalPoint, setTotalPoint] = useState(0);
  const [fermentasiData, setFermentasiData] = useState([
    { id: 1, nama: "Bokashi", kg: 0, status: "Sedang di Fermentasi" },
    { id: 2, nama: "Kompos", kg: 0, status: "Sedang di Fermentasi" },
    { id: 3, nama: "Eco-enzyme", kg: 0, status: "Sedang di Fermentasi" },
  ]);
  const [sampahTotalKg, setSampahTotalKg] = useState(0);

  useEffect(() => {
    // 1. Validasi Token (Keamanan)
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    // 2. LOGIKA PER AKUN (Gunakan email sebagai primary key di lokal)
    const userEmail = user?.email || "guest";

    // Ambil poin yang tersimpan khusus email ini
    const storedPoints = parseInt(localStorage.getItem(`totalPoints_${userEmail}`)) || 0;
    setTotalPoint(storedPoints);

    // Ambil semua data jurnal khusus email ini
    const journalsData = JSON.parse(localStorage.getItem(`jurnal_data_${userEmail}`)) || [];

    const fermentasiTotals = {
      "Bokashi": 0,
      "Kompos": 0,
      "Eco-enzyme": 0,
    };

    // Kalkulasi total sampah berdasarkan tindakan/kategori
    journalsData.forEach((journal) => {
      const kategori = journal.tindakan || "";
      const berat = parseFloat(journal.berat) || 0;
      const satuan = journal.beratSatuan;

      // Konversi otomatis ke Kg jika inputnya Gr
      const beratKg = satuan === "gr" ? berat / 1000 : berat;

      if (kategori === "Bokashi") {
        fermentasiTotals["Bokashi"] += beratKg;
      } else if (kategori === "Kompos") {
        fermentasiTotals["Kompos"] += beratKg;
      } else if (kategori.toLowerCase().includes("enz")) { // Menangkap Eco-Enzym atau Eco-enzyme
        fermentasiTotals["Eco-enzyme"] += beratKg;
      }
    });

    const totalSampah = fermentasiTotals["Bokashi"] + fermentasiTotals["Kompos"] + fermentasiTotals["Eco-enzyme"];

    // Update tampilan kartu bawah
    setFermentasiData([
      { id: 1, nama: "Bokashi", kg: fermentasiTotals["Bokashi"].toFixed(2), status: "Sedang di Fermentasi" },
      { id: 2, nama: "Kompos", kg: fermentasiTotals["Kompos"].toFixed(2), status: "Sedang di Fermentasi" },
      { id: 3, nama: "Eco-enzyme", kg: fermentasiTotals["Eco-enzyme"].toFixed(2), status: "Sedang di Fermentasi" },
    ]);

    setSampahTotalKg(totalSampah);
  }, [user, navigate]);

  const maxKg = 1000; // Target progress bar
  const persentaseSampah = (sampahTotalKg / maxKg) * 100;

  return (
    <div className="w-10/12 mx-auto p-5 bg-white min-h-screen">
      <div className="mb-6 flex justify-center text-5xl">
        {/* Fallback ke username jika nama_lengkap kosong */}
        <h1>Selamat Datang {user?.nama_lengkap || user?.email?.split('@')[0]}!</h1>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Jurnal FoodWise &gt;&gt;</h2>
        <button
          onClick={() => navigate("/history")}
          className="bg-green-700 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-md hover:bg-green-800 transition-all"
        >
          📜 Lihat Riwayat
        </button>
      </div>

      <div className="flex gap-3 mb-4">
        {/* Kotak Point */}
        <div className="border border-gray-300 rounded-sm shadow-sm w-full md:w-64 bg-white">
          <h2 className="text-sm font-bold border-b border-gray-300 px-4 py-2">Total Point</h2>
          <div className="flex justify-between items-center px-4 py-6">
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold">{totalPoint}</span>
              <span className="text-xs font-bold mt-1 uppercase">Point</span>
            </div>
            <div className="relative w-20 h-20">
              {/* Ikon Bintang Dekoratif */}
              <svg viewBox="0 0 24 24" className="w-12 h-12 text-yellow-300 absolute bottom-0 left-0" fill="#FDE047" stroke="#EAB308" strokeWidth="0.5">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <svg viewBox="0 0 24 24" className="w-16 h-16 text-yellow-400 absolute top-0 right-0 z-10" fill="#FACC15" stroke="#CA8A04" strokeWidth="0.5">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Kotak Progress Sampah */}
        <div className="flex-1 border border-gray-300 rounded-lg p-3 bg-white">
          <p className="text-xl text-center mb-2 font-medium">Sampah terkumpul</p>
          <p className="text-2xl font-bold mb-2 text-green-700">{sampahTotalKg.toFixed(2)} Kg</p>
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <Progress progress={persentaseSampah} color="green" size="xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Kartu Detail Kategori */}
      <div className="flex gap-2 mb-8">
        {fermentasiData.map((item) => (
          <div key={item.id} className="flex-1 border border-gray-300 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-green-500 py-2 text-center">
              <p className="text-white text-xs font-bold uppercase tracking-wider">{item.nama}</p>
            </div>
            <div className="p-2 py-10 text-center bg-white">
              <p className="text-2xl font-bold my-1">{item.kg} Kg</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}