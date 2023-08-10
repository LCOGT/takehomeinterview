import React, {useEffect, useState} from 'react';

// import downtimeArray from "./DowntimeArray"

function TableDisplay() {
    // Sorts the table by descending order
    // const sortedDowntimeArray = downtimeArray.sort((a, b) => new Date(b.start) - new Date(a.start));
    const [sortedDowntimeArray, setSortedDowntimeArray] = useState([]);
    const [collapsedRows, setCollapsedRows] = useState(Array(sortedDowntimeArray.length).fill(true));
    const [editedReason, setEditedReason] = useState('');
    const [errorCode, setErrorCode] = useState("Error: Unknown");
    const [showError, setshowError] = useState(false);

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

    const charCountExceeded = editedReason.length > 255;
    const reasonEdit = (index) => {
        if(!charCountExceeded){
            const updatedArray = [...sortedDowntimeArray];
            updatedArray[index].reason = editedReason;
            setSortedDowntimeArray(updatedArray);

            // Update local storage with the updated data
            localStorage.setItem('downtimeArray', JSON.stringify(updatedArray));
        } else {
            setErrorCode("Error: Reason Exceeds the character limit of 255",)
            setshowError(true);
        }
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
                <table className="table text-center table-zebra">
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
                        <tr className="font-bold">
                            <td>#{record.id}</td>
                            <td>{record.site}</td>
                            <td>{record.telescope}</td>
                            <td className="text-primary">{record.start}</td>
                            <td className="text-secondary">{record.end}</td>
                            <td>
                                <button className="btn btn-outline btn-accent btn-small" onClick={() => toggleCollapse(index)}>
                                    {collapsedRows[index] ? 'Expand' : 'Collapse'}
                                </button>
                            </td>
                        </tr>
                            {/* Collapsible Row Content */}
                            {!collapsedRows[index] && (
                                <tr>
                                    <td colSpan="7">
                                        <div className="grid max-h-400">
                                            {showError && (
                                                <div className="alert alert-error">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                    <span>{errorCode}</span>
                                                </div>
                                            )}
                                            <div className="grid grid-cols-3">
                                                <div className="py-2 px-1 max-w-xs break-words">
                                                    <h3 className="font-bold">Reason</h3>
                                                    <p>{record.reason || 'N/A'}</p>
                                                </div>
                                                <div className="py-2 px-1 max-w-xs break-words">
                                                    <h3 className="font-bold">Edit Reason</h3>
                                                    <textarea className="textarea textarea-bordered textarea-sm w-full max-w-xs"
                                                              placeholder="Edit Reason"
                                                              value={editedReason}
                                                              onChange={(e) => setEditedReason(e.target.value)}
                                                    ></textarea>
                                                    <button className="btn btn-primary py-2" onClick={()=> reasonEdit(index)}>Submit</button>
                                                </div>
                                                <div className="py-2 gap-2 max-w-xs">
                                                    <div>
                                                        <h3 className="font-bold">Delete Entry</h3>
                                                        <p>This option cannot be undone! </p>
                                                    </div>
                                                    <div>
                                                        <button className="btn btn-outline btn-error btn-small" onClick={()=> entryDelete(index)}>Delete Entry</button>
                                                    </div>
                                                </div>
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