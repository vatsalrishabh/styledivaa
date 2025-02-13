"use client"
import React from 'react'
import Footer from '../components/Footer'
import RightSlideCart from '../components/RightSlideCart'
import ForHer from '../components/ForHer'
import AllFemaleProducts from './AllFemaleProducts'


const page = () => {
  return (
    <div className='Contact-us '>
      <ForHer/>   {/* it contains Navbar and Hero section */}
      <AllFemaleProducts/>
      <RightSlideCart/>
      <Footer/> 
    </div>
  )
}

export default page
