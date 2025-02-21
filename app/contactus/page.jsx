"use client"
import React from 'react'
import Footer from '../components/Footer'
import ContactUsForm from './ContactUsForm'
import PageTitle from './PageTitle'
import Navbar from '../components/Navbar'


const page = () => {
  return (
    <div className='Contact-us '>
      <Navbar/>
      <PageTitle pagetitle="Contact Us" />
      <ContactUsForm/>
      <Footer/> 
    </div>
  )
}

export default page
