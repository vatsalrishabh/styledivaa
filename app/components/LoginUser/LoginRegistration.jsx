import React, { useState } from 'react'
import BeforeLogin from './BeforeLogin'
import RegisterUser from './RegisterUser'
import { Dialog } from '@mui/material'



const LoginRegistration = () => {
    const [showLogin , setShowLogin] = useState(true);
      const [openModall, setOpenModal] = useState(false);

    const openLoginModal =()=>{
        setShowLogin(false); // hover to regis
        setOpenModal(true); //keeps the modal open while hovering between login reg form

    }
    const openRegisterModal =()=>{
        setShowLogin(true); //hover to login
        setOpenModal(true); //keeps the modal open while hovering between login reg form
    }
    
  return (
    <div>
        {
            showLogin?  <BeforeLogin openLoginModal={openLoginModal} openModall={openModall} />:<RegisterUser openRegisterModal={openRegisterModal} openModall={openModall}/>
        }
    </div>
  )
}

export default LoginRegistration
