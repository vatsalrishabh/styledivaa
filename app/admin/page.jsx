import React from 'react'
import LeftLaptoSideNav from './LeftLaptoSideNav'
import MobileAdminNav from './MobileAdminNav'

const page = () => {
  return (
    <div>
    <LeftLaptoSideNav/>   {/* left side admin panel which changes right side component */}
    <MobileAdminNav/>
    </div>
  )
}

export default page
