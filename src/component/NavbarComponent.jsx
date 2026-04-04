import React from "react";
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

export default function NavbarComponent() {
  return (
    <>
      <div>
        <Navbar fluid className="!bg-white sticky top-0 z-50">
          <NavbarBrand href="/">
            <img
              src="/Foodwiseicons.png"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite React Logo"
            />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-black">
              FoodWise
            </span>
          </NavbarBrand>
          <NavbarCollapse>
<<<<<<< HEAD
            <NavbarLink href="#" className="!text-black">
              Beranda
=======
            <NavbarLink href="/" className="!text-black"> 
              Beranda
            </NavbarLink>
            <NavbarLink href="/dashboard"  className="!text-blue-950">
              Dashboard
>>>>>>> 7fd654c6444cb7143629fee999aa1f1f0825cb5a
            </NavbarLink>
            <NavbarLink href="#" className="!text-black">
              Projek
            </NavbarLink>
            <NavbarLink href="#" className="!text-black">
              JurnWaste
            </NavbarLink>
<<<<<<< HEAD
            <NavbarLink href="#" className="!text-black">
=======
            <NavbarLink href="/panduan"  className="!text-blue-950">
>>>>>>> 7fd654c6444cb7143629fee999aa1f1f0825cb5a
              Panduan
            </NavbarLink>
            <NavbarLink href="/dashboard" className="!text-black">
              Dashboard
            </NavbarLink>
          </NavbarCollapse>
        </Navbar>
      </div>
    </>
  );
}
