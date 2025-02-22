"use client"
import React from 'react'
import Footer from '../components/Footer'
import ContactUsForm from './ContactUsForm'
import PageTitle from './PageTitle'
import Navbar from '../components/Navbar'
import RightIconSmartphone from '../components/SmartphoneCartIcon/RightIconSmartphone'


const page = () => {
  return (
    <div className='Contact-us '>
      <Navbar/>
      <PageTitle pagetitle="Contact Us" />
      <ContactUsForm/>
      <RightIconSmartphone />    {/* this component has static cart icon in left, right slideshow */}
      <Footer/> 
    </div>
  )
}

export default page
