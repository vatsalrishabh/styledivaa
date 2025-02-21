"use client"
import React from 'react'
import Footer from '../components/Footer'
import RightSlideCart from '../components/RightSlideCart'
import ForHer from '../components/ForHer'
import AllFemaleProducts from './AllFemaleProducts'
import Navbar from '../components/Navbar'

const tabs = [
  { name: "For Her", href: "/forher",subNav:" ", dropDown:" " },
  { name: "Sale", href: "/forhim", subNav:"hidden" },
  { name: "About Us", href: "/aboutus", subNav:"hidden" },
  { name: "Gallery", href: "/gallery", subNav:"hidden" },
  { name: "Contact Us", href: "/contactus", subNav:"hidden" },
];

const page = () => {
  return (
    <div className='Contact-us '>
      <Navbar/>
      {/* <ForHer tabs={tabs}/>   it contains Navbar and Hero section */}
      <AllFemaleProducts/>
      <RightSlideCart/>
      <Footer/> 
    </div>
  )
}

export default page
