import React from 'react'

function Footer() {
    return (
        <footer className='footer sticky bottom-0 bg-light-primary bg-opacity-50 w-full dark:bg-dark-primary'>
            <div className='p-3 text-xs'>
                <p>App built by Eric Song</p>
                <p>Data from https://www.eia.gov/opendata/</p>
                <p><sup>[1]</sup>Glossary Definitions from: https://www.eia.gov/tools/glossary/index.php</p>
            </div>
        </footer>
    )
}

export default Footer