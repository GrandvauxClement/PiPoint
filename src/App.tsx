import * as React from "react";
import './App.css'
import DisplayAds from "./components/DisplayAds";
import Navbar from "./components/Navbar";

function App() {

  return (
    <div className="App">
        <Navbar />
        <DisplayAds />

        <p className="read-the-docs">
            Picom - Contactez nous au 06-06-06-06-06
        </p>
    </div>
  )
}

export default App
