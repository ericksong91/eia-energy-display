import { createContext, useState, useEffect } from "react";

const DarkModeContext = createContext(); // 1 refers to biggest heading level\

function DarkModeProvider({ children }) {
    const [darkMode, setDarkMode] = useState(false);
    const [graphTextColor, setGraphTextColor] = useState("bg-light-text");

    useEffect(() => {
        setGraphTextColor(darkMode ? "bg-light-text" : "bg-dark-text");
    }, [darkMode]);
    

    return (
        <DarkModeContext.Provider value={{ darkMode, setDarkMode, graphTextColor }}>
            {children}
        </DarkModeContext.Provider>
    );
};

export { DarkModeContext, DarkModeProvider };
