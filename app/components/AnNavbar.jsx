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

  return (
    <div className="w-full bg-custombg">
      {/* Top Navigation */}
      <div className="w-full flex justify-between items-center p-4">
        <div className="w-3/5 flex ">
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
              <CloseIcon className="text-white text-3xl" />
            ) : (
              <MenuIcon className="text-white text-3xl" />
            )}
          </div>
        </div>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="w-full bg-white p-4 flex flex-col items-center space-y-4 ">
          {/* Main Menu Items */}
          <div className="relative group">
            <Link href="/for-her" className="text-lg text-customText hover:text-brightPink cursor-pointer">
              For Her
            </Link>
            <div className="absolute hidden group-hover:block bg-white shadow-lg p-4 w-40">
              <Link href="/for-her/beauty" className="block text-customText hover:text-brightPink">Beauty</Link>
              <Link href="/for-her/fashion" className="block text-customText hover:text-brightPink">Fashion</Link>
            </div>
          </div>

          <div className="relative group">
            <Link href="/for-him" className="text-lg text-customText hover:text-brightPink cursor-pointer">
              For Him
            </Link>
            <div className="absolute hidden group-hover:block bg-white shadow-lg p-4 w-40">
              <Link href="/for-him/technology" className="block text-customText hover:text-brightPink">Technology</Link>
              <Link href="/for-him/grooming" className="block text-customText hover:text-brightPink">Grooming</Link>
            </div>
          </div>

          <div className="relative group">
            <Link href="/about-us" className="text-lg text-customText hover:text-brightPink cursor-pointer">
              About Us
            </Link>
          </div>

          <div className="relative group">
            <Link href="/gallery" className="text-lg text-customText hover:text-brightPink cursor-pointer">
              Gallery
            </Link>
          </div>

          <div className="relative group">
            <Link href="/contact-us" className="text-lg text-customText hover:text-brightPink cursor-pointer">
              Contact Us
            </Link>
          </div>
          <div className="relative group">
    {/* login button for smartphone  */}
           <LogInUserDetail/>
     {/* login button smartphone */}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnNavbar;
