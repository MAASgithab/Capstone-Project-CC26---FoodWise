import React from "react";
import CarouselComponent from "./component/CarouselComponent";
import NavbarComponent from "./component/NavbarComponent";
import CardProduct from "./component/CardProduct";
import { Button } from "flowbite-react"

export default function App() {
  return (
    <>
      <section className="relative w-full h-screen min-h-[500px] overflow-hidden">
        {/* Background Image */}
        <img
          src="/public/FoodwiseDashboard.png"
          alt="Food Waste Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 drop-shadow-lg">
              Apa itu food waste
            </h1>

            <p className="text-base md:text-lg text-white/90 leading-relaxed mb-8 drop-shadow-md max-w-xl mx-auto">
              Food Waste ialah masalah sampah makanan yang dikonsumsi
              oleh manusia yang terbuang begitu saja dan akhirnya menumpuk
              di Tempat Pembuangan Akhir.
            </p>

            <div className="flex gap-4 justify-center flex-wrap">
              <Button
                size="lg"
                className="
                text-white 
                font-bold 
                rounded-full 
                px-8
                backdrop-blur-sm
                cursor-pointer
                !bg-[#CCBA98A6]
              "
              >
                Pelajari lebih
              </Button>
            </div>
          </div>
        </div>
      </section>
      <div className="relative text-center pt-9 pb-0 overflow-visible">
        <div className="absolute inset-0 bg-gradient-to-r from-[#047630] to-[#83D38F]" />
        <h1 className="relative z-10 text-white text-5xl">
          <b>2025</b>
        </h1>
        <div className="relative z-10 flex justify-between mx-50 text-5xl text-center mt-5 translate-y-14">
          <div className="bg-white shadow-xl px-5 py-5 rounded-xl">
            <h1><b>{">"} 40</b></h1>
            <span>Ton sampah</span>
          </div>
          <div className="bg-white shadow-xl px-5 py-5 rounded-xl">
            <h1><b>61-125</b></h1>
            <span>Juta orang terdampak</span>
          </div>
          <div className="bg-white shadow-xl px-5 py-5 rounded-xl">
            <h1><b>Rp.500</b></h1>
            <span>Trilliun/tahun</span>
          </div>
        </div>
      </div>
      <div className="pb-24" />
      <div className="text-center py-30">
        <h1 className="text-8xl font-bold text-[#047630]">Ayo bergabung bersama kami !</h1>
        <p className="text-2xl mt-10 w-300 flex mx-auto">
          menjadi agen perubahan untuk masa depan yang lebih cerah, dan membantu
          mengurangi, mencegah dampak yang lebih besar di masa depan
        </p>
          <br />
          
        <Button className="flex mx-auto">bergabung</Button>

      </div>
    </>
  );
}
