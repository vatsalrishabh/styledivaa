import React, { useState } from 'react';
import logo from "../../public/assets/styledivaalogo.png";
import logowbg from "../../public/assets/styledivaawbg.png"; 
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import Link from 'next/link';
import LogInUserDetail from './LogInUserDetail';

const AnNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the menu on and off
  const toggleMenu = () => setIsOpen(!isOpen);

  // Navigation links data
  const navLinks = [
    {
      title: "For Her",
      href: "/forher",
      subLinks: [
        { title: "Beauty", href: "/forher/beauty" },
        { title: "Fashion", href: "/forher/fashion" },
      ],
    },
    {
      title: "For Him",
      href: "/forhim",
      subLinks: [
        { title: "Technology", href: "/forhim/technology" },
        { title: "Grooming", href: "/forhim/grooming" },
      ],
    },
    { title: "About Us", href: "/aboutus" },
    { title: "Gallery", href: "/gallery" },
    { title: "Contact Us", href: "/contactus" },
  ];

  return (
    <div className="w-full bg-custombg shadow-md">
      {/* Top Navigation */}
      <div className="w-full flex justify-between items-center p-4">
        {/* Logo */}
        <div className="w-3/5 flex">
          <Image
            src={logowbg}
            alt="Logo"
            width={150}
            height={150}
            className="rounded-full"
          />
        </div>

        {/* Menu Icon */}
        <div className="w-1/5 flex justify-end">
          <div onClick={toggleMenu} className="cursor-pointer">
            {isOpen ? (
              <CloseIcon className="text-white text-3xl hover:text-brightPink transition-colors" />
            ) : (
              <MenuIcon className="text-white text-3xl hover:text-brightPink transition-colors" />
            )}
          </div>
        </div>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="w-full bg-white p-4 flex flex-col items-center space-y-4 shadow-lg">
          {navLinks.map((link, index) => (
            <div key={index} className="relative group w-full text-center">
              <Link
                href={link.href}
                className="text-lg text-customText hover:text-brightPink cursor-pointer transition-colors"
              >
                {link.title}
              </Link>
              {/* Submenu */}
              {link.subLinks && (
                <div className="absolute hidden group-hover:block bg-white shadow-lg p-4 w-40 space-y-2 rounded-lg">
                  {link.subLinks.map((subLink, subIndex) => (
                    <Link
                      key={subIndex}
                      href={subLink.href}
                      className="block text-customText hover:text-brightPink transition-colors"
                    >
                      {subLink.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          {/* Login Button */}
          <div className="w-full text-center">
            <LogInUserDetail />
          </div>
        </div>
      )}
    </div>
  );
};

export default AnNavbar;