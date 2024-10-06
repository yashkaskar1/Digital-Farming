import React from 'react'
import { Link } from 'react-router-dom';
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";

function Navbar() {
  return (
    <>
      <nav className='shadow-lg px-4 py-3'>
        <div className='flex items-center justify-between container mx-auto'>
          <div className='font-bold text-xl'>
            Digital<span className='text-green-500'>Farming</span>
          </div>
          <div>
            <ul className='flex space-x-6'>
              <Link to="/" className='hover:text-green-500'>HOME</Link>
              <Link to="/Fertilizer" className='hover:text-green-500'>FERTILIZER</Link>
              <Link to="/SeasonWiseCrop" className='hover:text-green-500'>SEASON-WISE CROPS</Link>
              <Link to="/Spraying" className='hover:text-green-500'>SPRAYING</Link>
              <Link to="/About" className='hover:text-green-500'>ABOUT </Link>
              <Link to="/Contact" className='hover:text-green-500'>CONTACT</Link>
            </ul>
          </div>
          <div className='space-x-2'>
            <Link to="/Dashboard" className='bg-green-600 text-white font-semibold hover:bg-green-800 duration-300 px-4 py-2 rounded'>DASHBOARD</Link>
            <Link to="/Login" className='bg-red-600 text-white font-semibold hover:bg-red-800 duration-300 px-4 py-2 rounded'>LOGIN</Link>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar