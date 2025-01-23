"use client"
import React from 'react'
import Footer from '../components/Footer'
// import ContactUsForm from './ContactUsForm'
// import PageTitle from './PageTitle'
import RightSlideCart from '../components/RightSlideCart'
import ForHim from '../components/ForHim'


const page = () => {
  return (
    <div className='Contact-us '>
     <ForHim/>
      {/* <PageTitle pagetitle="Contact Us" />
      <ContactUsForm/> */}
      <Footer/> 
    </div>
  )
}

export default page
