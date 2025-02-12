"use client"
import React from 'react'
import Footer from '../components/Footer'
import RightSlideCart from '../components/RightSlideCart'
import Gallery from '../components/Gallery'
import GalleryOne from './GalleryOne'




const page = () => {
  return (
    <div className='Contact-us '>

  <Gallery/>
  <GalleryOne/>
      <Footer/> 
    </div>
  )
}

export default page
