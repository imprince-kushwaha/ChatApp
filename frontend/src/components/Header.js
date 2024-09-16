import React from 'react'
import logo from '../assets/logo.png'

const Header = () => {
  return (
    <>
    <header className='flex justify-center items-center py-3 h-20 shadow-md bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400'> 
      <img src={logo} alt='Logo'width='80' height='80'/>
    </header>
    
    </>
  )
}

export default Header