import React, { useState } from 'react';
import App from './App';
import AppDark from './AppDark';
// import Header from './Header ';

function AppRoot() {
    const [displayMode, setDisplayMode] = useState("light")

    return (
        <div className="approot">
            {/* <Header /> */}
            {/* {displayMode === "light" ? <App /> : <App />} */}
            {/* <App /> */}
        </div>
    )
}

export default AppRoot
