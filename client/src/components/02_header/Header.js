import React from 'react'
import logo from '../../images/lightbulb.svg'
// import Navbar from './Navbar'
import LightDarkToggle from './LightDarkToggle';

function Header() {
    return (
        <header className='header outline-1 outline bg-light-secondary'>
            <div className='container mx-auto'>
                <div className='flex items-center justify-between p-4'>
                    <img src={logo} alt="EIA Energy Data Logo has a lightbulb with the website name" className='logo w-8 object-cover rounded-lg outline-solid outline-10 grid-flow-row sm:grow-0' />
                    <h1 className='site-title font-bold tracking-widest hidden sm:block'>EIA Energy Display</h1>
                    {/* <Navbar /> */}
                    <LightDarkToggle />
                </div>
            </div>


        </header>
    )
}

export default Header