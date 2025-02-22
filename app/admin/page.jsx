import React from 'react'
import LeftLaptoSideNav from './LeftLaptoSideNav'
import MobileAdminNav from './MobileAdminNav'
import RLaptopSideNav from './RLaptopSideNav'

const page = () => {
  return (
    <div>
    <LeftLaptoSideNav/>   {/* left side admin panel which changes right side component */}
    <MobileAdminNav/>
    <RLaptopSideNav/>
    </div>
  )
}

export default page
