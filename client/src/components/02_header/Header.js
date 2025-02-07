import React from 'react'
import logo from '../../images/logoonly2.png'
// import Navbar from './Navbar'
import LightDarkToggle from './LightDarkToggle';

function Header() {
    return (
        <header className='header outline-1 outline bg-light-primary'>
            <div className='container mx-auto'>
                <div className='flex items-center sm:justify-between sm:align-middle p-4'>
                    <div className='flex logo grow justify-center sm:grow-0'>
                        <img src={logo} alt="EIA Energy Data Logo has a lightbulb with the website name" className='logo w-12' />
                    </div>
                    <div className='flex heading'>
                        <h1 className="heading text-4xl font-extrabold leading-none tracking-tight hidden sm:block text-light-text dark:text-white">EIA Energy Display</h1>
                    </div>
                    <div className='lightdark-mode flex align-middle items-center absolute sm:relative'>
                        <LightDarkToggle />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header