"use client"
import React from 'react'
import Footer from '../components/Footer'
import ContactUsForm from './ContactUsForm'
import PageTitle from './PageTitle'
import Navbar from '../components/Navbar'
import RightIconSmartphone from '../components/SmartphoneCartIcon/RightIconSmartphone'
import Slider from '../components/Slider'


const page = () => {
  return (
    <div className='Contact-us '>
      <Navbar/>
      {/* <Slider /> */}
      <PageTitle pagetitle="Contact Us" />
      <ContactUsForm/>
      <RightIconSmartphone />    {/* this component has static cart icon in left, right slideshow */}
      <Footer/> 
    </div>
  )
}

export default page
