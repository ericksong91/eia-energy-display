import { useContext } from "react";
import { IconContext } from "../00_context/IconContext";
import { DarkModeContext } from "../00_context/DarkModeContext";

function LightDarkToggle() {
    const { darkMode, setDarkMode } = useContext(DarkModeContext);
    const { sunIcon, moonIcon } = useContext(IconContext);

    return (
        <label className={`flex items-center align-middle cursor-pointer`}>
            <span className="sm:mr-3">
                {darkMode ? moonIcon : sunIcon}
            </span>

            <input type="checkbox" value="" className="sr-only peer" onClick={() => setDarkMode(!darkMode)} />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 
                    dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full 
                    peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] 
                    after:bg-white after:border-gray-300 after:border after:rounded-full 
                    after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600
                    
                    hidden sm:block
                    ">
            </div>
        </label>
    );
};

export default LightDarkToggle;