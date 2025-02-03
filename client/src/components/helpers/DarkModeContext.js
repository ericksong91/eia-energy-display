import { createContext, useState } from "react";

const DarkModeContext = createContext(); // 1 refers to biggest heading level\


function DarkModeProvider({ children }) {
    const [darkMode, setDarkMode] = useState(false);
    
    // const graphTextColor = darkMode ? "black" : "white";
    const graphTextColor = "black"

    return (
        <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};

export { DarkModeContext, DarkModeProvider };
