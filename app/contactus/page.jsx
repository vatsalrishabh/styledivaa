"use client"
import React from 'react'
import ContactUs from '../components/ContactUs'
import Footer from '../components/Footer'
import ContactUsForm from './ContactUsForm'
import PageTitle from './PageTitle'
import RightSlideCart from '../components/RightSlideCart'


const page = () => {
  return (
    <div className='Contact-us '>
      <ContactUs />  
      <PageTitle pagetitle="Contact Us" />
      <ContactUsForm/>
      <Footer/> 
    </div>
  )
}

export default page
