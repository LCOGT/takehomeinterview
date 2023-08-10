import React, {useEffect, useRef, useState} from "react";
import flatpickr from "flatpickr";
import downtimeArray from "./DowntimeArray";
import moment from "moment";
import "flatpickr/dist/flatpickr.min.css";


function DowntimeForm({ setDowntimeArray }) {
    let newID;
    const [newLocation, setLocation] = useState('NORTH');
    const [newTelescope, setTelescope] = useState('A');
    let newStartTime = useRef(null);
    let newEndTime = useRef(null);
    // ErrorCode
    const [errorCode, setErrorCode] = useState("Error: Unknown");
    const [showError, setshowError] = useState(false);
    const [inputSucc, setInputSucc] = useState(false);
    // Calender events
    useEffect(() => {
        flatpickr("#NewStartTime", {
            altInput: true,
            altFormat: "F j, Y h:m",
            enableTime: true,
            dateFormat: "Y-m-dTH:i:S",
            time_24hr: true,
            defaultDate: "today",
            maxDate: "today",
            utc: true,
        });
        flatpickr("#NewEndTime", {
            altInput: true,
            altFormat: "F j, Y h:m",
            enableTime: true,
            dateFormat: "Y-m-dTH:i:S",
            time_24hr: true,
            defaultDate: "today",
            maxDate: "today",
            utc: true,
        });
    }, []);

    // Reason char count
    const [inputReason, setInputText] = useState('');
    const charCountExceeded = inputReason.length > 255;
    const handleReasonChange = (e) => {
        setInputText(e.target.value);
    };

    // Submit information for new entry into the table
    const handleFormSubmit = () => {
        console.log("--- New ---")
        // Access Flatpickr instances using refs
        const startTimeFlatpickrInstance = newStartTime.current._flatpickr;
        const endTimeFlatpickrInstance = newEndTime.current._flatpickr;

        // Access selected dates from Flatpickr instances Note: 0 due to only 1 date selected
        const startTime = startTimeFlatpickrInstance.selectedDates[0];
        const endTime = endTimeFlatpickrInstance.selectedDates[0];

        // Convert selected start and end times to moment objects
        const chosenStart = moment(startTime);
        const chosenEnd = moment(endTime);

        console.log(newLocation);
        console.log(newTelescope);
        // checks if the end time is set earlier than the start time
        setshowError(false);
        if (endTime-startTime <= 0){
            setErrorCode("Error: End time is set prior or equal to the start time");
            setshowError(true);
            console.log(errorCode)

        } else {
            // Retrieve existing data from localStorage
            const existingData = JSON.parse(localStorage.getItem('downtimeArray')) || [];
            // Checks for overlapping entries before input
            let overlapCheck = false;
            for (let i in existingData){
                // If the Location and Telescope is the same as an entry prior, check the date/times for overlap
                if (existingData[i].site === newLocation && existingData[i].telescope === newTelescope) {
                    console.log("Match!")
                    const existingStartMoment = moment(existingData[i].start, "LLL");
                    const existingEndMoment = moment(existingData[i].end, "LLL");
                    // if NewStart/NewEnd is between a written key
                    if (
                        (existingStartMoment <= chosenStart && existingEndMoment >= chosenStart) ||
                        (existingStartMoment <= chosenEnd && existingEndMoment >= chosenEnd) ||
                        (chosenStart <= existingStartMoment && existingStartMoment <= chosenEnd)){
                        overlapCheck = true;
                    }
                }
            }
            if (!overlapCheck && !charCountExceeded){
                // Grabs the last value within the entry.ID then aggregates by 1
                const mathMax = existingData.length > 0 ? Math.max(...existingData.map(entry => entry.id)) : 0;
                newID = mathMax + 1
                console.log("NewID: ",newID)
                // New Entry input
                const newEntry ={
                    id: newID,
                    site: newLocation,
                    telescope: newTelescope,
                    start: moment(startTime).format('LLL'),
                    end: moment(endTime).format('LLL'),
                    reason: inputReason
                }
                console.log("No OverLap Found ", newEntry)

                // Push the new entry to the existing data
                existingData.push(newEntry);
                localStorage.setItem('downtimeArray', JSON.stringify(existingData));
                // Update state and localStorage with the updated data
                setDowntimeArray(existingData);
                setshowError(false);
                setInputSucc(true);


            //    Errors will show here based on these issues.
            } else if (overlapCheck && !charCountExceeded) {
                setErrorCode("Error: Start or End value intersects with another entry.")
                setshowError(true);
            } else if (!overlapCheck && charCountExceeded){
                setErrorCode("Error: Reason is too long, set to N/A please update reason.")
                setshowError(true);
            } else {
                setErrorCode("Error: Both Time and Reason have errors.")
                setshowError(true);
            }
        }

    };

    return (
        <div className="grid place-content-center gap-4">
            {/*<h2 className="text-center font-bold">Add New Record</h2>*/}
            {/* Location and Telescope */}
            <div className="grid grid-cols-2 place-content-center">
                <div>
                    <label className="label">
                        <span className="label-text text-white font-bold">Location</span>
                    </label>
                    <select className="select select-bordered w-full max-w-xs text-black dark:text-white"
                            value={newLocation.toUpperCase()}
                            onChange={(e) => {
                                setLocation(e.target.value);
                            }}>
                        <option disabled selected>Select Location</option>
                        <option value="NORTH">North</option>
                        <option value="SOUTH">South</option>
                        <option value="EAST">East</option>
                        <option value="WEST">West</option>
                    </select>
                </div>
                <div>
                    <label className="label">
                        <span className="label-text text-white font-bold">Telescope</span>
                    </label>
                    <select className="select select-bordered w-full max-w-xs text-black dark:text-white"
                            value={newTelescope.toUpperCase()}
                            onChange={(e) => {
                                setTelescope(e.target.value);
                            }}>
                        <option disabled selected>Select Telescope</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                    </select>
                </div>
            </div>
            {/* Calendars */}
            <div>
                {/*TODO Format Calendars*/}
                <div className="flex flex-row gap-x-2">
                    <div>
                        <label className="label">
                            <span className="label-text text-white font-bold">Start Date/Time</span>
                        </label>
                        <input className="input input-bordered w-full max-w-xs text-black dark:text-white"
                               type="text"
                               id="NewStartTime"
                               ref={newStartTime}/>
                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text text-white font-bold">End Date/Time</span>
                        </label>
                        <input className="input input-bordered w-full max-w-xs text-black dark:text-white"
                               type="text"
                               id="NewEndTime"
                               ref={newEndTime}/>
                    </div>
                </div>
            </div>
            {/* Reason and Button Section*/}
            <div className="flex items-end gap-x-1">
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text text-white font-bold">Reason</span>
                        <span className={`badge label-text-alt font-bold ${charCountExceeded ? 'text-red-600' : ''}`}>
                            {inputReason.length}/255
                        </span>
                    </label>
                    <input className="input input-bordered w-full max-w-xs text-black dark:text-white" type="text"
                           placeholder="Please Type a Reason"
                           value={inputReason}
                           onChange={handleReasonChange}
                    />
                </div>
                {/* Button */}
                <div>
                    <button className="btn btn-secondary dark:btn-primary" onClick={handleFormSubmit}>Submit</button>
                </div>
            </div>
            {inputSucc && (
                <div className="alert alert-success">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>Record Added! Please refresh page.</span>
                </div>
            )
            }
            {showError && (
                <div className="alert alert-error">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{errorCode}</span>
                </div>
            )}
        </div>
    )
}

export default DowntimeForm