"use client"
import React from 'react'
import Footer from '../components/Footer'
import FirstAbout from './FirstAbout'
import CountingAbout from './CountingAbout'
import Navbar from '../components/Navbar'



const page = () => {
  return (
    <div className='Contact-us '>
<Navbar/>
  <FirstAbout/>
  <CountingAbout/>
      <Footer/> 
    </div>
  )
}

export default page
