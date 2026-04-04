import React from "react";
import {
  Footer,
  FooterCopyright,
  FooterLink,
  FooterLinkGroup,
} from "flowbite-react";

export default function FooterComponent() {
  return (
    <>
      <Footer container className="rounded-none !bg-[#0b7a2f] text-white mt-5">
        <div className="mx-auto w-full px-8 py-6">
          {/* Wrapper utama */}
          <div className="flex flex-col gap-8 md:flex-row md:justify-between">
            {/* Kolom 1 */}
            <div className="md:w-1/3">
              <h2 className="mb-3 text-lg font-bold">Food waste Indonesia</h2>
              <p className="text-sm leading-6">
                Food waste Indonesia adalah platform yang mengedukasi dan
                membantu cara mengelola makanan sisa dan mengurangi food waste.
              </p>
              <p className="mt-2 text-sm">Mulai lah bergabung bersama kami!</p>
            </div>

            {/* Kolom 3 */}
            <div className="md:w-1/3">
              <h2 className="mb-3 text-lg font-bold">Lokasi</h2>
              <p className="text-sm leading-6">
                Jl. Raya Wangun, Kelurahan Sindangsari,
                <br />
                Kecamatan Bogor Timur, Kota Bogor,
                <br />
                Jawa Barat
              </p>
            </div>
          </div>

          {/* Garis bawah */}
          <div className="mt-6 border-t border-white pt-3">
            <p className="text-xs">© Copyright 2026 Food waste Indonesia</p>
          </div>
        </div>
      </Footer>
    </>
  );
}
