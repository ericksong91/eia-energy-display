import React from 'react'
import logo from '../../images/logo.png'
import Navbar from './Navbar'
import LightDarkToggle from './LightDarkToggle';

function Header({ onDarkMode, darkMode }) {
    return (
        <header className='header items-center bg-blue-900 bg-opacity-30'>
            <div className='container mx-auto'>
                <div className='flex items-center'>
                    <img src={logo} alt="EIA Energy Data Logo has a lightbulb with the website name" className='logo w-32 object-cover rounded-lg border-2 mx-4 my-2' />
                    <Navbar />
                    <LightDarkToggle onDarkMode={onDarkMode} darkMode={darkMode} />
                </div>
            </div>


        </header>
    )
}

export default Header