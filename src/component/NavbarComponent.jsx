import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  Button,
} from "flowbite-react";
import logoBrand from "/public/Foodwiseicons.png";

export default function NavbarComponent() {
  // State untuk mengecek apakah user sudah login atau belum
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Cek token di localStorage saat komponen pertama kali muncul
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Fungsi untuk Logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Hapus token dari brankas browser
    setIsLoggedIn(false);
    alert("Berhasil Logout!");
    window.location.href = "/"; // Balik ke halaman utama
  };

  return (
    <Navbar fluid className="!bg-white sticky top-0 z-50 border-b shadow-sm">
      <NavbarBrand href="/">
        <img
          src={logoBrand}
          className="mr-3 h-6 sm:h-9"
          alt="FoodWise Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-bold dark:text-black">
          FoodWise
        </span>
      </NavbarBrand>

      {/* Bagian Tombol Aksi (Paling Kanan) */}
      <div className="flex md:order-2 gap-2">
        {!isLoggedIn ? (
          // Jika BELUM Login, tampilkan Login & Sign Up
          <>
            <Button href="/pendaftaran" color="info" size="sm">
              Login
            </Button>
            <Button href="/pendaftaran" className="!bg-green-500" size="sm">
              Sign Up
            </Button>
          </>
        ) : (
          // Jika SUDAH Login, tampilkan Logout
          <Button color="failure" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        )}
        <NavbarToggle />
      </div>

      {/* Menu Navigasi Tengah */}
      <NavbarCollapse>
        <NavbarLink href="/" className="!text-black font-medium">
          Beranda
        </NavbarLink>
        <NavbarLink href="/dashboard" className="!text-blue-950 font-medium">
          Dashboard
        </NavbarLink>
        <NavbarLink href="/Jurnal" className="!text-blue-950 font-medium">
          JurnWaste
        </NavbarLink>
        <NavbarLink href="/panduan" className="!text-blue-950 font-medium">
          Panduan
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}