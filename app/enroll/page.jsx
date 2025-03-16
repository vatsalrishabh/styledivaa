import React from 'react'
import Navbar from '../components/Navbar'
import EnrollTop from './EnrollTop'
import Footer from '../components/Footer'
import RightIconSmartphone from '../components/SmartphoneCartIcon/RightIconSmartphone'


const page = () => {

  return (
    <div className='Enroll-Now'>
      <Navbar/>
      <EnrollTop />
      <RightIconSmartphone />    {/* this component has static cart icon in left, right slideshow */}
      <Footer/>
    </div>
  )
}

export default page
