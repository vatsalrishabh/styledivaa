"use client"
import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import RightIconSmartphone from '../components/SmartphoneCartIcon/RightIconSmartphone'
import AllFemaleProducts from '../dressmaterial/AllFemaleProducts'



const page = () => {
  return (
    <div className='Contact-us '>
  
       <Navbar/>
       <AllFemaleProducts category="readymadekurtas" />
       <RightIconSmartphone />    {/* this component has static cart icon in left, right slideshow */}
      <Footer/> 
    </div>
  )
}

export default page
