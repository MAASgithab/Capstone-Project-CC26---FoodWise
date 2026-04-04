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
          <div className="flex md:order-2">
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="User settings"
                  img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  rounded
                />
              }
            >
              <DropdownHeader>
                <span className="block text-sm">Bonnie Green</span>
                <span className="block truncate text-sm font-medium">
                  name@flowbite.com
                </span>
              </DropdownHeader>
              <DropdownItem>Dashboard</DropdownItem>
              <DropdownItem>Settings</DropdownItem>
              <DropdownItem>Earnings</DropdownItem>
              <DropdownDivider />
              <DropdownItem>Sign out</DropdownItem>
            </Dropdown>
            <NavbarToggle />
          </div>
          <NavbarCollapse>
            <NavbarLink href="/" className="!text-black"> 
              Beranda
            </NavbarLink>
            <NavbarLink href="/dashboard"  className="!text-blue-950">
              Dashboard
            </NavbarLink>
            <NavbarLink href="#"  className="!text-blue-950">
              JurnWaste
            </NavbarLink>
            <NavbarLink href="/panduan"  className="!text-blue-950">
              Panduan
            </NavbarLink>
          </NavbarCollapse>
        </Navbar>
      </div>
    </>
  );
}
