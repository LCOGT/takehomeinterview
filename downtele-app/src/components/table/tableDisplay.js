import React, {useEffect, useState} from 'react';

// import downtimeArray from "./DowntimeArray"

function TableDisplay() {
    // Sorts the table by descending order
    // const sortedDowntimeArray = downtimeArray.sort((a, b) => new Date(b.start) - new Date(a.start));
    const [sortedDowntimeArray, setSortedDowntimeArray] = useState([]);
    const [collapsedRows, setCollapsedRows] = useState(Array(sortedDowntimeArray.length).fill(true));
    const [editedReason, setEditedReason] = useState('');

    useEffect(() => {
        const storedData = localStorage.getItem('downtimeArray');
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            // Sort the data when retrieved
            const sortedData = parsedData.sort((a, b) => new Date(b.start) - new Date(a.start));
            setSortedDowntimeArray(sortedData);
            setCollapsedRows(Array(sortedData.length).fill(true));
        }
    }, []); // Empty dependency array to run the effect only once on mount

    const toggleCollapse = (index) => {
        const updatedCollapsedRows = [...collapsedRows];
        updatedCollapsedRows[index] = !updatedCollapsedRows[index];
        setCollapsedRows(updatedCollapsedRows);
    };

    const reasonEdit = (index) => {
        const updatedArray = [...sortedDowntimeArray];
        updatedArray[index].reason =editedReason;
        setSortedDowntimeArray(updatedArray);
    };

    const entryDelete = (index) => {
        const updatedArray = sortedDowntimeArray.filter((_, i) => i !== index);
        setSortedDowntimeArray(updatedArray);
        const storedData = JSON.parse(localStorage.getItem('downtimeArray')) || [];
        const updatedData = storedData.filter((_, i) => i !== index);
        localStorage.setItem('downtimeArray', JSON.stringify(updatedData));
    };


    return (
        <div className="container mx-auto mt-4">
            <div className="text-xl mb-4">
                <h2 className="text-center font-bold">Downtime Records</h2>
                <table className="table text-center">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Site</th>
                        <th>Telescope</th>
                        <th>Start</th>
                        <th>End</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {sortedDowntimeArray.map((record, index) => (
                        <React.Fragment key={record.start}>
                        {/*TODO: Worst case scenario if you cannot get collapse to work use popups*/}
                        <tr className="hover">
                            <td>{record.id}</td>
                            <td>{record.site}</td>
                            <td>{record.telescope}</td>
                            <td>{record.start}</td>
                            <td>{record.end}</td>
                            <td>
                                <button className="btn" onClick={() => toggleCollapse(index)}>
                                    {collapsedRows[index] ? 'Expand' : 'Collapse'}
                                </button>
                            </td>
                        </tr>
                            {/* Collapsible Row Content */}
                            {!collapsedRows[index] && (
                                <tr>
                                    <td colSpan="7">
                                        {/* Add your collapsible content here */}
                                        <div className="grid grid-rows-2 gap-3">
                                            <div className="grid grid-cols-2">
                                                <div className="">
                                                    <h3>Reason:</h3>
                                                    <p>{record.reason || 'N/A'}</p>
                                                </div>
                                                <div>
                                                    <textarea className="textarea textarea-bordered"
                                                              placeholder="Edit Reason"
                                                              value={editedReason}
                                                              onChange={(e) => setEditedReason(e.target.value)}
                                                    ></textarea>
                                                    <button className="btn btn-primary " onClick={()=> reasonEdit(index)}>Submit</button>
                                                </div>
                                            </div>
                                            <button className="btn btn-outline btn-error" onClick={()=> entryDelete(index)}>Delete Entry</button>
                                            <div>
                                        </div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TableDisplay;