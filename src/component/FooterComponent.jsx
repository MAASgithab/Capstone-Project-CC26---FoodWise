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
      <Footer container className="!bg-[#61A57B] mt-3">
        <div className="flex flex-wrap gap-5">
          <div style={{ color: "white" }}>
            <h5>FoodWise</h5>
            <p>
              Food waste Indonesia adalah platform yang mengedukasi dan membantu
              cara mengelola makanan sisa dan mengurangi food waste. Mulai lah
              bergabung bersama kami!
            </p>
          </div>
          <div style={{ color: "white" }}>
            <h5>Lokasi</h5>
            <p>
              Jl. Raya Wangun, Kelurahan Sindangsari, Kecamatan Bogor Timur,
              Kota Bogor, Jawa Barat
            </p>
          </div>
          <FooterCopyright
            href="#"
            by="FoodWiseNoWaste™"
            year={2022}
            className="!text-white"
          />
        </div>
      </Footer>
    </>
  );
}
