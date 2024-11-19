import React from 'react'
import logo from '../../images/logo.png'
import Navbar from './Navbar'

function Header() {
    return (
        <header className='header flex items-center w-full bg-blue-900 bg-opacity-30'>
            <img src={logo} alt="EIA Energy Data Logo has a lightbulb with the website name" className='logo w-32 object-cover rounded-lg border-2 mx-4 my-2' />
            <Navbar />
        </header>
    )
}

export default Header