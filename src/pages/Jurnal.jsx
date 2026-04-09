import React, { useState } from 'react';

export default function Jurnal() {
  // State form sederhana
  const [namaBahan, setNamaBahan] = useState('');
  const [kategori, setKategori] = useState('');
  const [tanggalBeli, setTanggalBeli] = useState('');
  const [tanggalKadaluarsa, setTanggalKadaluarsa] = useState('');
  const [jumlah, setJumlah] = useState('');
  const [metode, setMetode] = useState('');
  const [catatan, setCatatan] = useState('');

  // Fungsi submit sederhana
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validasi sederhana
    if (!namaBahan || !kategori || !tanggalBeli || !tanggalKadaluarsa || !jumlah || !metode) {
      alert('Semua field wajib diisi!');
      return;
    }

    // Simpan data (bisa disesuaikan dengan kebutuhan)
    const data = {
      namaBahan,
      kategori,
      tanggalBeli,
      tanggalKadaluarsa,
      jumlah,
      metode,
      catatan
    };

    console.log('Data form:', data);
    alert('Form berhasil disubmit!');
    
    // Reset form setelah submit
    handleReset();
  };

  // Fungsi reset sederhana
  const handleReset = () => {
    setNamaBahan('');
    setKategori('');
    setTanggalBeli('');
    setTanggalKadaluarsa('');
    setJumlah('');
    setMetode('');
    setCatatan('');
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 font-sans text-black">
      <h1 className="text-2xl font-bold mb-10">Form Jurnal FoodWise</h1>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
        {/* Field Nama Bahan */}
        <div className="flex items-center">
          <label className="text-sm w-32 shrink-0">Nama bahan :</label>
          <input 
            type="text"
            value={namaBahan}
            onChange={(e) => setNamaBahan(e.target.value)}
            className="bg-[#E8E8E8] h-10 w-full outline-none px-3"
            required
          />
        </div>

        {/* Field Kategori */}
        <div className="flex items-center">
          <label className="text-sm w-32 shrink-0">Kategori :</label>
          <select 
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
            className="bg-[#E8E8E8] h-10 w-full outline-none px-3"
            required
          >
            <option value="">Pilih kategori</option>
            <option value="sisa_makanan">Sisa Makanan</option>
            <option value="daun_kering">Daun Kering</option>
            <option value="kertas">Kertas</option>
            <option value="kardus">Kardus</option>
            <option value="lainnya">Lainnya</option>
          </select>
        </div>

        {/* Field Tanggal Beli */}
        <div className="flex items-center">
          <label className="text-sm w-32 shrink-0">Tanggal beli :</label>
          <input 
            type="date"
            value={tanggalBeli}
            onChange={(e) => setTanggalBeli(e.target.value)}
            className="bg-[#E8E8E8] h-10 w-full outline-none px-3"
            required
          />
        </div>

        {/* Field Tanggal Kadaluarsa */}
        <div className="flex items-center">
          <label className="text-sm w-32 shrink-0">Kadaluarsa :</label>
          <input 
            type="date"
            value={tanggalKadaluarsa}
            onChange={(e) => setTanggalKadaluarsa(e.target.value)}
            className="bg-[#E8E8E8] h-10 w-full outline-none px-3"
            required
          />
        </div>

        {/* Field Jumlah */}
        <div className="flex items-center">
          <label className="text-sm w-32 shrink-0">Jumlah :</label>
          <input 
            type="number"
            value={jumlah}
            onChange={(e) => setJumlah(e.target.value)}
            className="bg-[#E8E8E8] h-10 w-full outline-none px-3"
            required
            min="0"
            step="0.1"
          />
        </div>

        {/* Field Metode Pengolahan */}
        <div className="flex items-center">
          <label className="text-sm w-32 shrink-0">Metode :</label>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="kompos"
                name="metode"
                value="kompos"
                checked={metode === 'kompos'}
                onChange={(e) => setMetode(e.target.value)}
              />
              <label htmlFor="kompos" className="text-sm font-medium">Kompos</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="bokashi"
                name="metode"
                value="bokashi"
                checked={metode === 'bokashi'}
                onChange={(e) => setMetode(e.target.value)}
              />
              <label htmlFor="bokashi" className="text-sm font-medium">Bokashi</label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="eco-enzyme"
                name="metode"
                value="eco-enzyme"
                checked={metode === 'eco-enzyme'}
                onChange={(e) => setMetode(e.target.value)}
              />
              <label htmlFor="eco-enzyme" className="text-sm font-medium">Eco Enzyme</label>
            </div>
          </div>
        </div>

        {/* Field Catatan Tambahan */}
        <div className="md:col-span-2 flex items-center">
          <label className="text-sm w-32 shrink-0">Catatan :</label>
          <textarea 
            value={catatan}
            onChange={(e) => setCatatan(e.target.value)}
            className="bg-[#E8E8E8] h-20 w-full outline-none px-3 py-2"
            placeholder="Catatan tambahan (opsional)"
          />
        </div>

        {/* Tombol Submit dan Reset */}
        <div className="hidden md:block"></div>
        <div className="flex justify-end items-end mt-4 md:mt-0 gap-3">
          <button 
            type="button"
            onClick={handleReset}
            className="bg-[#e30000] text-white text-sm font-bold py-2 px-8 rounded hover:bg-red-600 transition-colors"
          >
            Reset
          </button>
          <button 
            type="submit"
            className="bg-[#00E359] text-white text-sm font-bold py-2 px-8 rounded hover:bg-green-600 transition-colors"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
}
