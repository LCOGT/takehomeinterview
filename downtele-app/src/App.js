// import logo from './logo.svg';
import React, { useState } from "react";
import './App.css';
import TableDisplay from "./components/table/tableDisplay";
import DowntimeForm from "./components/table/DowntimeForm";
import Time_line from "./components/charts/timeline";
// import downtimeArray from "./components/table/DowntimeArray";


function App() {

    // Load data from local storage on app start
    const initialDowntimeArray = JSON.parse(localStorage.getItem('downtimeArray')) || [];

    const [downtimeArray, setDowntimeArray] = useState(initialDowntimeArray);

    return (
        <div className="hero bg-base-200">
            <div className="flex justify-center items-center min-h-screen p-10">
                <div className="hero-content p-3">
                    <div className="card bg-base-100 shadow-2xl p-1">
                        <div className="p-3">
                            {/* Parent functions that Pass TableDisplay and DowntimeForm as a prop */}
                            <Time_line />
                            <TableDisplay downtimeArray={downtimeArray} />
                            {/* Collapse for Adding a New Record */}
                            <div tabIndex={0} className="collapse bg-primary text-primary-content focus:bg-secondary focus:text-secondary-content dark:bg-secondary">
                                <input type="checkbox" className="peer" />
                                <div className="collapse-title text-center font-bold text-white">
                                    Add New Record
                                </div>
                                <div className="collapse-content">
                                    <DowntimeForm setDowntimeArray={setDowntimeArray} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
