import React from 'react'
import logo from '../../images/logoonly2.png'
// import Navbar from './Navbar'
import LightDarkToggle from './LightDarkToggle';

function Header() {
    return (
        <header className='header outline-1 outline bg-light-primary bg-opacity-35'>
            <div className='container mx-auto'>
                <div className='flex items-center justify-between align-middle p-4'>
                    <img src={logo} alt="EIA Energy Data Logo has a lightbulb with the website name" className='logo w-12 object-cover grid-flow-row sm:grow-0' />
                    <h1 className="heading text-4xl font-extrabold leading-none tracking-tight text-light-text dark:text-white">EIA Energy Display</h1>
                    {/* <h1 className='site-title heading mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white hidden sm:block'>EIA Energy Display</h1> */}
                    {/* <Navbar /> */}
                    <LightDarkToggle />
                </div>
            </div>


        </header>
    )
}

export default Header