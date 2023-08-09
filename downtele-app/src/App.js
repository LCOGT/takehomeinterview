// import logo from './logo.svg';
import React, {useState, useEffect} from "react";
import './App.css';
import TableDisplay from "./components/table/tableDisplay";
import DowntimeForm from "./components/table/DowntimeForm";
import downtimeArray from "./components/table/DowntimeArray";


function App() {

    // Load data from local storage on app start
    const initialDowntimeArray = JSON.parse(localStorage.getItem('downtimeArray')) || [];

    const [downtimeArray, setDowntimeArray] = useState(initialDowntimeArray);

    return (
        <div className="hero">
            <div className="flex justify-center items-center min-h-screen">
                <div className="hero-content p-3">
                    <div className="card shadow-2xl gap-3">
                        {/* Parent functions that Pass TableDisplay and DowntimeForm as a prop */}
                        <TableDisplay downtimeArray={downtimeArray} />
                        <DowntimeForm setDowntimeArray={setDowntimeArray} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
