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
            <NavbarLink href="#" className="!text-black">
              Beranda
            </NavbarLink>
            <NavbarLink href="#" className="!text-black">
              Projek
            </NavbarLink>
            <NavbarLink href="#" className="!text-black">
              JurnWaste
            </NavbarLink>
            <NavbarLink href="#" className="!text-black">
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
