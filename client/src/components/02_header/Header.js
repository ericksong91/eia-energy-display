import React from 'react'
import logo from '../../images/logowithtextside.png'
// import Navbar from './Navbar'
import LightDarkToggle from './LightDarkToggle';

function Header() {
    return (
        <header className='header outline-1 outline bg-light-primary'>
            <div className='container mx-auto'>
                <div className='flex items-center sm:justify-between sm:align-middle p-4 sm:py-4 sm:p-0'>
                    <div className='flex logo grow justify-center sm:grow-0'>
                        <img src={logo} alt="EIA Energy Data Logo has a lightbulb with the website name" className='logo w-52' />
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