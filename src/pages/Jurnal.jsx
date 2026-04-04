import React from "react";

export default function Jurnal() {
    return (
        <div className="max-w-5xl mx-auto px-6 py-10 font-sans text-black">
            <h1 className="text-2xl font-bold mb-10">Jurnal FoodWise &gt;&gt;</h1>

            <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-14">
                <div className="border border-gray-300 rounded-sm shadow-sm w-full md:w-64">
                    <h2 className="text-sm font-bold border-b border-gray-300 px-4 py-2">Total Point</h2>
                    <div className="flex justify-between items-center px-4 py-6">
                        <div className="flex flex-col items-center">
                            <span className="text-4xl font-bold">87</span>
                            <span className="text-xs font-bold mt-1">Point</span>
                        </div>
                        <div className="relative w-20 h-20">
                            <svg viewBox="0 0 24 24" className="w-12 h-12 text-yellow-300 absolute bottom-0 left-0 drop-shadow-md" fill="#FDE047" stroke="#EAB308" strokeWidth="0.5">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                            <svg viewBox="0 0 24 24" className="w-16 h-16 text-yellow-400 absolute top-0 right-0 z-10 drop-shadow-md" fill="#FACC15" stroke="#CA8A04" strokeWidth="0.5">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="border border-gray-300 rounded-sm shadow-sm w-full md:w-80 flex flex-col items-center p-5">
                    <h2 className="text-sm font-bold border-b border-gray-300 w-full text-center pb-2 mb-5">Sampah terkumpul</h2>
                    <div className="text-4xl font-normal mb-2">64Kg</div>
                    <div className="text-green-500 text-5xl mb-5">🌱</div>
                    <div className="w-4/5 bg-white border border-gray-300 rounded-full h-5 flex items-center px-1">
                        <div className="bg-[#00C652] h-3.5 rounded-full w-1/4"></div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
                <div className="border border-gray-300 shadow-sm flex flex-col items-center">
                    <div className="bg-[#84D494] w-full text-white font-bold py-3 text-center text-base">Bokashi</div>
                    <div className="py-10 flex flex-col items-center">
                        <span className="text-4xl font-normal mb-3">3 Kg</span>
                        <span className="text-xs text-gray-500">Sedang di Fermentasi</span>
                    </div>
                </div>
                <div className="border border-gray-300 shadow-sm flex flex-col items-center">
                    <div className="bg-[#84D494] w-full text-white font-bold py-3 text-center text-base">Kompos</div>
                    <div className="py-10 flex flex-col items-center">
                        <span className="text-4xl font-normal mb-3">50 Kg</span>
                        <span className="text-xs text-gray-500">Sedang di Fermentasi</span>
                    </div>
                </div>
                <div className="border border-gray-300 shadow-sm flex flex-col items-center">
                    <div className="bg-[#84D494] w-full text-white font-bold py-3 text-center text-base">Eco-enzyme</div>
                    <div className="py-10 flex flex-col items-center">
                        <span className="text-4xl font-normal mb-3">11 Kg</span>
                        <span className="text-xs text-gray-500">Sedang di Fermentasi</span>
                    </div>
                </div>
            </div>

            <div className="border border-gray-200 p-8 mb-16 shadow-sm">
                <div className="flex items-center mb-8">
                    <span className="font-bold text-sm mr-4 whitespace-nowrap">Input bahan</span>
                    <div className="h-px bg-gray-200 w-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
                    <div className="flex items-center">
                        <label className="text-sm w-32 shrink-0">Nama bahan :</label>
                        <input type="text" className="bg-[#E8E8E8] h-10 w-full outline-none px-3" />
                    </div>
                    <div className="flex items-center">
                        <label className="text-sm w-32 shrink-0">Kadaluarsa :</label>
                        <input type="text" className="bg-[#E8E8E8] h-10 w-full outline-none px-3" />
                    </div>
                    <div className="flex items-center">
                        <label className="text-sm w-32 shrink-0">Kategori :</label>
                        <input type="text" className="bg-[#E8E8E8] h-10 w-full outline-none px-3" />
                    </div>
                    <div className="hidden md:block"></div>
                    <div className="flex items-center">
                        <label className="text-sm w-32 shrink-0">Tanggal beli :</label>
                        <input type="text" className="bg-[#E8E8E8] h-10 w-full outline-none px-3" />
                    </div>
                    <div className="flex justify-end items-end mt-4 md:mt-0">
                        <button className="bg-[#00E359] text-white text-sm font-bold py-2 px-8 rounded hover:bg-green-500 transition-colors">
                            simpan
                        </button>
                    </div>
                </div>
            </div>

            <h2 className="text-xl font-bold mb-8">Produk kami &gt;&gt;</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
                <div className="flex flex-col items-center">
                    <div className="bg-[#D9D9D9] w-full aspect-square mb-4"></div>
                    <span className="font-bold text-sm">Nama produk</span>
                </div>
                <div className="flex flex-col items-center">
                    <div className="bg-[#D9D9D9] w-full aspect-square mb-4"></div>
                    <span className="font-bold text-sm">Nama produk</span>
                </div>
                <div className="flex flex-col items-center">
                    <div className="bg-[#D9D9D9] w-full aspect-square mb-4"></div>
                    <span className="font-bold text-sm">Nama produk</span>
                </div>
            </div>
        </div>
    );
}