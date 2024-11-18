import React from 'react'
import Navbar from './Navbar'

function Header() {
    return (
        <header>
            <section className='hero'>
                <img className="w-full" src="https://www.clearvoice.com/wp-content/uploads/2021/02/Hero-Image_Hero_1360x646.png" />
            </section>
            <Navbar />
        </header>
    )
}

export default Header