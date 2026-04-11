import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function Jurnal() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // 1. STATE UNTUK FORM
  const [formData, setFormData] = useState({
    aktivitas: "Masak",
    bersisa: "Ya",
    tindakan: "Kompos",
    jam: "",
    jamPeriode: "PM",
    berat: "50",
    beratSatuan: "kg",
  });

  // 2. STATE UNTUK KATEGORI (Ambil dari Backend)
  const [categories, setCategories] = useState([
    { id: 1, name: "Kompos" },
    { id: 2, name: "Bokashi" },
    { id: 3, name: "Eco-Enzym" },
    { id: 4, name: "Diberikan ke Hewan" }
  ]);

  const [isLoading, setIsLoading] = useState(false);

  // 3. FUNGSI AMBIL KATEGORI DARI BACKEND
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/api/categories", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        const result = await response.json();
        if (result.success) {
          setCategories(result.data); // Pakai data dari database backend
        }
      } catch (error) {
        console.error("Gagal ambil kategori dari backend, pakai data manual:", error);
      }
    };

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Anda harus login terlebih dahulu!");
      navigate("/");
    } else {
      fetchCategories(); // Jalankan ambil data kategori
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = (e) => {
    if (e) e.preventDefault();
    setFormData({
      aktivitas: "Masak", bersisa: "Ya", tindakan: "Kompos",
      jam: "", jamPeriode: "PM", berat: "50", beratSatuan: "kg",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const userEmail = user?.email || "guest";

    setTimeout(() => {
      const waktuSekarang = new Date().toISOString();
      const keyJurnal = `jurnal_data_${userEmail}`;
      const existing = JSON.parse(localStorage.getItem(keyJurnal) || "[]");

      const dataBaru = {
        ...formData,
        id: Date.now(),
        tanggalInput: waktuSekarang
      };

      existing.push(dataBaru);
      localStorage.setItem(keyJurnal, JSON.stringify(existing));

      const keyPoin = `totalPoints_${userEmail}`;
      const points = parseInt(localStorage.getItem(keyPoin) || "0");
      localStorage.setItem(keyPoin, (points + 5).toString());

      alert("Jurnal Berhasil Disimpan!");
      setIsLoading(false);
      handleReset();
    }, 800);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    if (window.confirm("Anda yakin ingin membatalkan?")) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white rounded-lg shadow-md p-6">
      <form onSubmit={handleSubmit}>
        {/* TAMPILAN TETAP SAMA PERSIS SESUAI REQUEST LU */}
        <div className="mb-4">
          <label className="block text-base font-bold text-black mb-1 text-left">Apa anda masak atau makan hari ini?</label>
          <select name="aktivitas" value={formData.aktivitas} onChange={handleChange} className="w-36 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded px-3 py-2 focus:outline-none">
            <option value="Masak">Masak</option>
            <option value="Makan">Makan</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-base font-bold text-black mb-1 text-left">Apa makanan anda bersisa?</label>
          <select name="bersisa" value={formData.bersisa} onChange={handleChange} className="w-36 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded px-3 py-2 focus:outline-none">
            <option value="Ya">Ya</option>
            <option value="Tidak">Tidak</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-base font-bold text-black mb-1 text-left">Anda apakan dengan makanan yang bersisa?</label>
          <select name="tindakan" value={formData.tindakan} onChange={handleChange} className="w-48 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded px-3 py-2 focus:outline-none">
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-base font-bold text-black mb-1 text-left">pukul berapa anda selesai makan?</label>
          <input type="time" name="jam" value={formData.jam} onChange={handleChange} className="w-32 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded px-3 py-2" />
        </div>

        <div className="mb-6">
          <label className="block text-base font-bold text-black mb-1 text-left">Berapa beratnya (gr/kg)</label>
          <div className="flex items-center gap-2">
            <input type="number" name="berat" value={formData.berat} onChange={handleChange} className="w-32 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded px-3 py-2" />
            <select name="beratSatuan" value={formData.beratSatuan} onChange={handleChange} className="w-20 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded px-3 py-2">
              <option value="gr">gr</option>
              <option value="kg">kg</option>
            </select>
          </div>
        </div>

        <div className="flex justify-between gap-3 mt-40">
          <button onClick={handleCancel} className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded">Cancel</button>
          <button onClick={handleReset} className="w-full py-2 px-4 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded">Reset</button>
          <button type="submit" disabled={isLoading} className="w-full py-2 px-4 bg-green-800 hover:bg-green-900 text-white font-bold rounded">
            {isLoading ? "Menyimpan..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}