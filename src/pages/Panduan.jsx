import React, { useState } from "react";
import { Button } from "flowbite-react";

export default function Panduan() {
  const [currentSection, setCurrentSection] = useState(0);

  const sections = [
    { id: 0, title: "Kompos", component: <KomposSection /> },
    { id: 1, title: "Bokashi", component: <BokashiSection /> },
    { id: 2, title: "Eco Enzym", component: <EcoEnzymSection /> },
  ];

  const nextSection = () => {
    setCurrentSection((prev) => (prev + 1) % sections.length);
  };

  const prevSection = () => {
    setCurrentSection((prev) => (prev - 1 + sections.length) % sections.length);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Panduan Pengolahan Sampah
          </h1>
          <p className="text-gray-600">
            Pilih metode pengolahan yang sesuai dengan kebutuhan Anda
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mb-8">
          <Button
            onClick={prevSection}
            className="!bg-[#74A67B] text-white font-semibold px-6 py-3 rounded-lg"
          >
            ←
          </Button>

          <Button
            onClick={nextSection}
            className="!bg-[#74A67B] text-white font-semibold px-6 py-3 rounded-lg"
          >
            →
          </Button>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">
              {sections[currentSection].title}
            </h2>
          </div>

          <div>{sections[currentSection].component}</div>
        </div>
      </div>
    </div>
  );
}

// Kompos Section Component
function KomposSection() {
  return (
    <div className="space-y-6 bg-[#E4EAD3]">
      <div className="p-4 rounded">
        <h3 className="text-lg font-semibold mb-2">Apa itu Kompos?</h3>
        <p>
          Kompos adalah proses penguraian bahan organik oleh mikroorganisme
          seperti sisa makanan, daun, dan kertas menjadi pupuk alami yang kaya
          nutrisi untuk tanaman.
        </p>
      </div>

      <div className="ps-4">
        <h4 className="text-md font-semibold text-gray-700 mb-3">
          Bahan yang bisa dikompos:
        </h4>
        <ul className="list-disc list-inside space-y-1 text-gray-600">
          <li>Bahan hijau: Sisa sayuran dan buah-buahan</li>
          <li>Kulit telur</li>
          <li>Kopi dan teh (tanpa kantong plastik)</li>
          <li>
            Bahan cokelat: Daun kering, Kertas koran (tanpa tinta berbahaya),
            Kardus
          </li>
        </ul>
      </div>

      <div className="ps-4">
        <h4 className="text-md font-semibold text-gray-700 mb-3">
          Cara membuat kompos:
        </h4>
        <ol className="list-decimal list-inside space-y-2 text-gray-600">
          <li>Siapkan wadah kompos atau lubang di tanah</li>
          <li>Potong: Cacah sampah jadi ukuran kecil</li>
          <li>
            Campur bahan hijau (sisa makanan) dengan bahan coklat (daun kering,
            kertas) jika ada
          </li>
          <li>Tumpuk: Masukkan ke wadah kompos atau lubang di tanah</li>
          <li>
            Basahi dengan percikkan air agar lembap seperti spons (jangan sampai
            banjir).
          </li>
          <li>Aduk seminggu sekali agar ada oksigen.</li>
        </ol>
      </div>

      <div className="ps-4">
        <p>
          Hasilnya: Dalam 4-8 minggu, sampah akan berubah jadi tanah hitam yang
          subur.
        </p>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
        <h3 className="text-lg font-semibold text-yellow-800 mb-2">Catatan</h3>
        <p className="text-yellow-700 text-sm">
          Jangan masukkan daging, susu, atau minyak ke dalam kompos karena bisa
          menarik hewan dan menyebabkan bau tidak sedap.
        </p>
      </div>
    </div>
  );
}

// Bokashi Section Component
function BokashiSection() {
  return (
    <div className="space-y-6 bg-[#E4EAD3]">
      <div className="p-4 rounded">
        <h3 className="text-lg font-semibold mb-2">Apa itu Bokashi?</h3>
        <p>
          Bokashi adalah teknik pengomposan ala Jepang yang menggunakan metode
          fermentasi anaerob (tanpa udara). Proses pembuatan Bokashi jauh lebih
          cepat (2-4 minggu) dan bisa mengolah sisa daging atau susu.
        </p>
      </div>

      <div className="ps-4">
        <h4 className="text-md font-semibold text-gray-700 mb-3">
          Keunggulan Bokashi:
        </h4>
        <ul className="list-disc list-inside space-y-1 text-gray-600">
          <li>Bisa mengolah semua jenis sisa makanan</li>
          <li>Proses lebih cepat (2-4 minggu)</li>
          <li>Tidak menarik lalat atau hewan lain</li>
          <li>
            Menghasilkan cairan bokashi yang bisa digunakan sebagai pupuk cair
          </li>
          <li>Tidak menghasilkan bau busuk</li>
        </ul>
      </div>

      <div className="ps-4">
        <h4 className="text-md font-semibold text-gray-700 mb-3">
          Bahan Utama:
        </h4>
        <ul className="list-disc list-inside space-y-1 text-gray-600">
          <li>Sampah Organik</li>
          <li>Starter Bokashi (EM4): Cairan mikroba efektif.</li>
          <li>Dedak/Bekatuk</li>
          <li>
            Wadah Kedap Udara: Ember khusus dengan keran di bawah untuk
            mengeluarkan cairan.
          </li>
        </ul>
      </div>

      <div className="ps-4">
        <h4 className="text-md font-semibold text-gray-700 mb-3 ">
          Cara membuat bokashi:
        </h4>
        <ol className="list-decimal list-inside space-y-2 text-gray-600">
          <li>Siapkan wadah bokashi dengan tutup rapat</li>
          <li>Potong sampah organik menjadi ukuran kecil</li>
          <li>
            Masukkan sampah ke wadah, lalu taburkan dedak yang sudah dicampur
            EM4 di atasnya secara merata.
          </li>
          <li>Padatkan sampah untuk membuang rongga udara</li>
          <li>Tutup rapat dan simpan di tempat sejuk</li>
          <li>Setiap 2-3 hari, buka keran untuk mengeluarkan "teh bokashi".</li>
        </ol>
      </div>

      <div className="ps-4">
        <h4 className="text-md font-semibold text-gray-700 mb-3 ">
          Hasil Akhir:
        </h4>
        <ol className="list-disc list-inside space-y-2 text-gray-600">
          <li>Waktu: Hanya butuh 2 minggu fermentasi di dalam wadah.</li>
          <li>
            Ciri Berhasil: Sampah tidak hancur seperti tanah (masih terlihat
            bentuk aslinya), tapi teksturnya lunak dan berbau asam segar seperti
            acar/tape.
          </li>
          <li>
            Penyelesaian: Masukkan hasil fermentasi tadi ke dalam tanah atau
            pot, tutup dengan tanah selama 2 minggu lagi agar menyatu jadi pupuk
            siap pakai.
          </li>
        </ol>
      </div>
    </div>
  );
}

// Eco Enzym Section Component
function EcoEnzymSection() {
  return (
    <div className="space-y-6 bg-[#E4EAD3]">
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">Apa itu Eco Enzym?</h3>
        <p>
          Eco-enzyme adalah cairan serbaguna hasil fermentasi sampah organik.
          Eco-enzyme menghasilkan cairan pembersih alami.
        </p>
      </div>

      <div className="ps-4">
        <h4 className="text-md font-semibold text-gray-700 mb-3">
          Manfaat Eco Enzym:
        </h4>
        <ul className="list-disc list-inside space-y-1 text-gray-600">
          <li>Pembersih alami untuk lantai dan peralatan</li>
          <li>Sabun cuci piring yang ramah lingkungan</li>
          <li>Pupuk cair untuk tanaman</li>
          <li>Penghilang bau tidak sedap</li>
          <li>Pembasmi serangga tanaman</li>
        </ul>
      </div>

      <div className="ps-4">
        <h4 className="text-md font-semibold text-gray-700 mb-3">
          Cara membuat eco enzyme:
        </h4>
        <ol className="list-decimal list-inside space-y-2 text-gray-600">
          <li>Siapkan wadah plastik dengan tutup longgar</li>
          <li>
            Masukan dan campur 1 bagian gula merah, 3 bagian sisa buah, dan 10 bagian air
          </li>
          <li>Aduk</li>
          <li>Tutup rapat dan simpan di tempat sejuk selama 3 bulan</li>
          <li>Saring dan simpan cairan eco enzyme</li>
        </ol>
      </div>

      <div className="ps-4">
        <h4 className="text-md font-semibold text-gray-700 mb-3">
          Hasil Akhir:
        </h4>
        <p>Jika berhasil, cairan akan berwarna cokelat gelap dengan aroma asam segar khas fermentasi.</p>
        <p>Jika gagal, Muncul jamur hitam atau bau busuk (tanda terkontaminasi).</p>
      </div>

      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
        <h3 className="text-lg font-semibold text-red-800 mb-2">Peringatan</h3>
        <p className="text-red-700 text-sm">
          Jangan gunakan wadah kaca! Gunakan wadah plastik karena proses
          fermentasi menghasilkan gas dan perpotensi meledak.
        </p>
      </div>
    </div>
  );
}
