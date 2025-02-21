"use client"
import React from 'react'
import Footer from '../components/Footer'
import AllFemaleProducts from './AllFemaleProducts'
import Navbar from '../components/Navbar'



const page = () => {
  return (
    <div className='Contact-us '>
      <Navbar/>
      <AllFemaleProducts/>

      <Footer/> 
    </div>
  )
}

export default page
