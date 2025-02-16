import { createContext, useState, useEffect } from "react";

const DarkModeContext = createContext(); // 1 refers to biggest heading level\

function DarkModeProvider({ children }) {
    const [darkMode, setDarkMode] = useState(false);
    const [graphColors, setGraphColors] = useState({
        text: darkMode ? "#9cc3c9" : "#365D63",
        grid: darkMode ? "#9cc3c9" : "#8d8d8d",
    });

    useEffect(() => {
        const updatedGraphColors = {
            text: darkMode ? "#9cc3c9" : "#365D63",
            grid: darkMode ? "#9cc3c9" : "#8d8d8d",
        };

        setGraphColors(updatedGraphColors);
    }, [darkMode]);


    return (
        <DarkModeContext.Provider value={{ darkMode, setDarkMode, graphColors }}>
            {children}
        </DarkModeContext.Provider>
    );
};

export { DarkModeContext, DarkModeProvider };
