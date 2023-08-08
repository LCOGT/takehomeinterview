// import logo from './logo.svg';
import React from "react";
import './App.css';
import TableDisplay from "./components/table/tableDisplay";
import DowntimeForm from "./components/table/DowntimeForm";
import downtimeArray from "./components/table/DowntimeArray";


function App() {
    return (
        <div className="hero">
            <div className="flex justify-center items-center min-h-screen">
                <div className="hero-content p-3">
                    <div className="card shadow-2xl gap-3">
                        {/* Passed TableDisplay as a prop*/}
                        <TableDisplay downtimeArray={downtimeArray} />
                        <DowntimeForm/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
