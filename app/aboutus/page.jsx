"use client"
import React from 'react'
import Footer from '../components/Footer'
import RightSlideCart from '../components/RightSlideCart'
import AboutUs from '../components/AboutUs'
import FirstAbout from './FirstAbout'
import CountingAbout from './CountingAbout'



const page = () => {
  return (
    <div className='Contact-us '>
<AboutUs/>
  <FirstAbout/>
  <CountingAbout/>
      <Footer/> 
    </div>
  )
}

export default page
