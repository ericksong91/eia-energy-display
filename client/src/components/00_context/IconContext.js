import { createContext } from "react";
const IconContext = createContext();

function IconProvider({ children }) {
    const moonIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-5">
        <path strokeLinecap="round" strokeLinejoin="round"
            d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
    </svg>

    const sunIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round"
            d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
    </svg>

    const downArrow = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>

    const upArrow = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round"
            d="m4.5 15.75 7.5-7.5 7.5 7.5" />
    </svg>

    const leftIcon = <svg className="h-5 w-5 mt-60 sm:mt-0 sm:w-4 sm:h-4 transition-all text-slate-600 hover:text-black dark:text-slate-400 dark:group-hover:text-white rtl:rotate-180"
        aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
    </svg>


    const rightIcon = <svg className="h-5 w-5 mt-60 sm:mt-0 sm:w-4 sm:h-4 transition-all text-slate-600 hover:text-black dark:text-slate-400 dark:group-hover:text-white rtl:rotate-180"
        aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
    </svg>

    return (
        <IconContext.Provider value={{ moonIcon, sunIcon, downArrow, upArrow, leftIcon, rightIcon }}>
            {children}
        </IconContext.Provider>
    );
};

export { IconContext, IconProvider };
