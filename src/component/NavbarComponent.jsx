import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate untuk redirect
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  Button,
} from "flowbite-react";
// import logoBrand from public folder
import logoBrand from "/public/Foodwiseicons.png";
import { useAuth } from "../context/useAuth"; // Import custom hook untuk auth

export default function NavbarComponent() {
  // Get isAuthenticated dan logout dari context
  const { isAuthenticated, logout, user } = useAuth();

  // Hook untuk redirect halaman
  const navigate = useNavigate();

  // Fungsi untuk handle logout
  const handleLogout = () => {
    // Panggil logout function dari context
    logout();
    // Redirect ke halaman Home
    navigate("/");
  };

  return (
    <>
      <div>
        <Navbar fluid className="!bg-white sticky top-0 z-50">
          {/* Brand / Logo */}
          <NavbarBrand href="/">
            <img
              src={logoBrand}
              className="mr-3 h-6 sm:h-9"
              alt="FoodWise Logo"
            />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-black">
              FoodWise
            </span>
          </NavbarBrand>

          {/* Navigation Links */}
          <NavbarCollapse>
            <NavbarLink href="/" className="!text-black">
              Beranda
            </NavbarLink>
            <NavbarLink href="/dashboard" className="!text-blue-950">
              Dashboard
            </NavbarLink>
            <NavbarLink href="/Jurnal" className="!text-blue-950">
              JurnWaste
            </NavbarLink>
            <NavbarLink href="/panduan" className="!text-blue-950">
              Panduan
            </NavbarLink>
          </NavbarCollapse>

          {/* Auth Buttons */}
          <NavbarCollapse>
            {/* Tampilkan Login dan Sign Up hanya jika user belum login */}
            {!isAuthenticated ? (
              <>
                <NavbarLink href="/pendaftaran">
                  <Button>
                    Login
                  </Button>
                </NavbarLink>
                <NavbarLink href="/pendaftaran">
                  <Button className="!bg-green-500">
                    Sign Up
                  </Button>
                </NavbarLink>
              </>
            ) : (
              <>
                {/* Tombol Logout */}
                <NavbarLink href="#" onClick={(e) => {
                  e.preventDefault();
                  handleLogout();
                }}>
                  <Button className="!bg-red-500">
                    Logout
                  </Button>
                </NavbarLink>
              </>
            )}
          </NavbarCollapse>
        </Navbar>
      </div>
    </>
  );
}
