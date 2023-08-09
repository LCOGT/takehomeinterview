import React, { useState, useEffect } from 'react';
import downtimeArray from "./DowntimeArray"

function TableDisplay() {
    // Sorts the table by descending order
    // const sortedDowntimeArray = downtimeArray.sort((a, b) => new Date(b.start) - new Date(a.start));
    const [sortedDowntimeArray, setSortedDowntimeArray] = useState([]);

    useEffect(() => {
        const storedData = localStorage.getItem('downtimeArray');
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            // Sort the data when retrieved
            const sortedData = parsedData.sort((a, b) => new Date(b.start) - new Date(a.start));
            setSortedDowntimeArray(sortedData);
        }
    }, []); // Empty dependency array to run the effect only once on mount

    return (
        <div className="container mx-auto mt-4">
                <div className="text-xl mb-4">
                    <h2 className="text-center font-bold">Downtime Records</h2>
                    <table className="table table-zebra text-center">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Site</th>
                            <th>Telescope</th>
                            <th>Start</th>
                            <th>End</th>
                            <th>Reason</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {sortedDowntimeArray.map((record) => (
                            //TODO: Worst case scenario if you cannot get collapse to work use popups
                            <tr key={record.start} className="hover">
                                <td>{record.id}</td>
                                <td>{record.site}</td>
                                <td>{record.telescope}</td>
                                <td>{record.start}</td>
                                <td>{record.end}</td>
                                <td>{record.reason || 'N/A'}</td>
                                <td>

                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
            </div>
        </div>
    );
}

export default TableDisplay;