import React, { useState, useEffect } from 'react'
import { Progress } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [totalPoint, setTotalPoint] = useState(0);
  const [logs, setLogs] = useState([]); // State untuk tabel history
  const [fermentasiData, setFermentasiData] = useState([
    { id: 1, nama: "Bokashi", kg: 0 },
    { id: 2, nama: "Kompos", kg: 0 },
    { id: 3, nama: "Eco-enzyme", kg: 0 },
  ]);
  const [sampahTotalKg, setSampahTotalKg] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    const userEmail = user?.email || "guest";

    // 1. Ambil Poin
    const storedPoints = parseInt(localStorage.getItem(`totalPoints_${userEmail}`)) || 0;
    setTotalPoint(storedPoints);

    // 2. Ambil Data Jurnal untuk Kalkulasi & Tabel History
    const journalsData = JSON.parse(localStorage.getItem(`jurnal_data_${userEmail}`)) || [];

    // Set data untuk tabel (Data terbaru di atas)
    setLogs([...journalsData].reverse());

    const fermentasiTotals = {
      "Bokashi": 0,
      "Kompos": 0,
      "Eco-enzyme": 0,
    };

    journalsData.forEach((journal) => {
      const kategori = journal.tindakan || "";
      const berat = parseFloat(journal.berat) || 0;
      const satuan = journal.beratSatuan;
      const beratKg = satuan === "gr" ? berat / 1000 : berat;

      if (kategori === "Bokashi") {
        fermentasiTotals["Bokashi"] += beratKg;
      } else if (kategori === "Kompos") {
        fermentasiTotals["Kompos"] += beratKg;
      } else if (kategori.toLowerCase().includes("enz")) {
        fermentasiTotals["Eco-enzyme"] += beratKg;
      }
    });

    const totalSampah = fermentasiTotals["Bokashi"] + fermentasiTotals["Kompos"] + fermentasiTotals["Eco-enzyme"];

    setFermentasiData([
      { id: 1, nama: "Bokashi", kg: fermentasiTotals["Bokashi"].toFixed(2) },
      { id: 2, nama: "Kompos", kg: fermentasiTotals["Kompos"].toFixed(2) },
      { id: 3, nama: "Eco-enzyme", kg: fermentasiTotals["Eco-enzyme"].toFixed(2) },
    ]);

    setSampahTotalKg(totalSampah);
  }, [user, navigate]);

  const maxKg = 1000;
  const persentaseSampah = (sampahTotalKg / maxKg) * 100;

  return (
    <div className="w-10/12 mx-auto p-5 bg-white min-h-screen">
      {/* HEADER */}
      <div className="mb-6 flex justify-center text-5xl">
        <h1>Selamat Datang {user?.nama_lengkap || user?.email?.split('@')[0]}!</h1>
      </div>

      {/* JUDUL JURNAL */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Jurnal FoodWise &gt;&gt;</h2>
      </div>

      {/* KOTAK ATAS: POIN & PROGRESS */}
      <div className="flex gap-3 mb-4">
        <div className="border border-gray-300 rounded-sm shadow-sm w-full md:w-64 bg-white p-2">
          <h2 className="text-sm font-bold border-b border-gray-300 px-2 py-2 mb-2">Total Point</h2>
          <div className="flex justify-between items-center px-2">
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold">{totalPoint}</span>
              <span className="text-xs font-bold uppercase">Point</span>
            </div>
            <div className="relative w-16 h-16">
              <svg viewBox="0 0 24 24" className="w-10 h-10 text-yellow-300 absolute bottom-0 left-0" fill="#FDE047">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <svg viewBox="0 0 24 24" className="w-14 h-14 text-yellow-400 absolute top-0 right-0 z-10" fill="#FACC15">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex-1 border border-gray-300 rounded-lg p-3 bg-white">
          <p className="text-xl text-center mb-2 font-medium">Sampah terkumpul</p>
          <p className="text-2xl font-bold mb-2 text-green-700">{sampahTotalKg.toFixed(2)} Kg</p>
          <Progress progress={persentaseSampah} color="green" size="xl" />
        </div>
      </div>

      {/* KARTU DETAIL KATEGORI */}
      <div className="flex gap-2 mb-8">
        {fermentasiData.map((item) => (
          <div key={item.id} className="flex-1 border border-gray-300 rounded-lg overflow-hidden shadow-sm">
            <div className="bg-green-500 py-2 text-center font-bold text-white text-xs uppercase">
              {item.nama}
            </div>
            <div className="p-6 text-center bg-white font-bold text-2xl">
              {item.kg} Kg
            </div>
          </div>
        ))}
      </div>

      {/* =========================================== */}
      {/* TABEL HISTORY (LANGSUNG DI DASHBOARD) */}
      {/* =========================================== */}
      <div className="mt-10 border border-gray-300 rounded-lg overflow-hidden shadow-sm bg-white">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-300">
          <h3 className="text-lg font-bold text-green-800">Riwayat Jurnal Terbaru</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-green-50 text-green-800 font-bold">
              <tr>
                <th className="p-3 border-b">Waktu</th>
                <th className="p-3 border-b">Aktivitas</th>
                <th className="p-3 border-b">Tindakan</th>
                <th className="p-3 border-b">Berat</th>
              </tr>
            </thead>
            <tbody>
              {logs.length > 0 ? (
                logs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50 border-b last:border-0 transition-colors">
                    <td className="p-3 text-gray-600">
                      {new Date(log.id).toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' })}
                      ---</td>
                    <td className="p-3 font-medium">{log.aktivitas}</td>
                    <td className="p-3">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                        {log.tindakan}
                      </span>
                    </td>
                    <td className="p-3 font-bold text-gray-800">{log.berat} {log.beratSatuan}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-10 text-center text-gray-400 italic">Belum ada riwayat aktivitas.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}