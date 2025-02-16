import { useContext } from 'react';
import { DarkModeContext } from '../00_context/DarkModeContext';
import darkLogo from '../../images/logo_darkmode.png';
import lightLogo from '../../images/logo_lightmode.png';
// import Navbar from './Navbar'
import LightDarkToggle from './LightDarkToggle';

function Header() {
    const { darkMode } = useContext(DarkModeContext);

    return (
        <header className='header outline-1 outline bg-light-primary dark:bg-dark-primary'>
            <div className='container mx-auto'>
                <div className='flex items-center sm:justify-between sm:align-middle p-4 sm:py-4 sm:p-0'>
                    <div className='flex logo grow justify-center sm:grow-0'>
                        <img src={darkMode ? darkLogo : lightLogo} alt="EIA Energy Data Logo has a lightbulb with the website name" className='logo w-52' />
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