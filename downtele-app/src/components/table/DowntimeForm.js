import React, {useEffect, useRef, useState} from "react";
import flatpickr from "flatpickr";
import DowntimeArray from "./DowntimeArray";
import downtimeArray from "./DowntimeArray";
import moment from "moment";
import "flatpickr/dist/flatpickr.min.css";


function DowntimeForm() {
    let newID;
    const [newLocation, setNewLocation] = useState('');
    const [newTelescope, setNewTelescope] = useState('');
    let newStartTime = useRef(null);
    let newEndTime = useRef(null);
    let newReason = '';

    // Calender events
    useEffect(() => {
        flatpickr("#NewStartTime", {
            altInput: true,
            altFormat: "F j, Y h:m",
            enableTime: true,
            dateFormat: "Y-m-dTH:i:S",
            time_24hr: true,
            defaultDate: "today",
            maxDate: "today"
        });
        flatpickr("#NewEndTime", {
            altInput: true,
            altFormat: "F j, Y h:m",
            enableTime: true,
            dateFormat: "Y-m-dTH:i:S",
            time_24hr: true,
            defaultDate: "today",
            maxDate: "today"
        });
    }, []);

    // Reason char count
    const [Reason, setInputText] = useState('');
    const handleReasonChange = (e) => {
        setInputText(e.target.value);
    };
    const charCount = Reason.length;
    const charCountExceeded = charCount > 255;
    if (!charCountExceeded) {
        newReason = Reason
    } else {
        newReason = "Reason is too long, Please give a shorter description"
    }

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
        const selectedStartMoment = moment(startTime);
        const selectedEndMoment = moment(endTime);

        // checks if the end time is set earlier than the start time
        if (endTime-startTime < 0){
            console.log("Error: End time prior to start time")
        } else {
            // Checks for overlapping entries before input
            let overlapCheck = false;
            for (let i in downtimeArray){
                // If the Location and Telescope is the same as an entry prior, check the date/times for overlap
                if (downtimeArray[i].site === newLocation && downtimeArray[i].telescope === newTelescope){
                    console.log("Match!")
                    const existingStartMoment = moment(downtimeArray[i].start, "LLL");
                    const existingEndMoment = moment(downtimeArray[i].end, "LLL");
                    // if NewStart/NewEnd is between a written key
                    if (
                        (existingStartMoment <= selectedStartMoment && existingEndMoment >= selectedStartMoment) ||
                        (existingStartMoment <= selectedEndMoment && existingEndMoment >= selectedEndMoment) ||
                        (selectedStartMoment <= existingStartMoment && existingStartMoment <= selectedEndMoment)){
                        console.log("Error: Start or End value intersects with another entry.")
                        overlapCheck = true;
                    }
                }
            }
            if (!overlapCheck){
                let mathMax = Math.max(...downtimeArray.map(entry => entry.id));
                console.log(newID)
                const newEntry ={
                    id: mathMax + 1,
                    site: newLocation,
                    telescope: newTelescope,
                    start: moment(startTime).format('LLL'),
                    end: moment(endTime).format('LLL'),
                    reason: newReason
                }
                console.log("No OverLap Found ", newEntry)
                downtimeArray.push(newEntry);
                localStorage.setItem('downtimeArray', JSON.stringify(downtimeArray));
            }
        }

        // console.log(newID)
        // console.log(newLocation)
        // console.log(newTelescope)
        // console.log("Start Time:", moment(startTime).format('LLL'));
        // console.log("End Time:", moment(endTime).format('LLL'));
        // console.log(endTime-startTime)
        // console.log(newReason)
    };

    return (
        <div className="grid place-content-center gap-4">
            <h2 className="text-center font-bold">Add New Record</h2>
            {/* Location and Telescope */}
            <div className="flex flex-row gap-x-2">
                <div>
                    <label className="label">
                        <span className="label-text">Location</span>
                    </label>
                    <select className="select select-bordered"
                            value={newLocation}
                            onChange={(e) => {
                                setNewLocation(e.target.value);
                            }}>
                        <option disabled selected>Select Location</option>
                        <option value="North">North</option>
                        <option value="South">South</option>
                        <option value="East">East</option>
                        <option value="West">West</option>
                    </select>
                </div>
                <div>
                    <label className="label">
                        <span className="label-text">Telescope</span>
                    </label>
                    <select className="select select-bordered"
                            value={newTelescope}
                            onChange={(e) => {
                                setNewTelescope(e.target.value);
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
                            <span className="label-text">Start Date/Time</span>
                        </label>
                        <input className="input input-bordered w-full max-w-xs"
                               type="text"
                               id="NewStartTime"
                               ref={newStartTime}/>
                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text">End Date/Time</span>
                        </label>
                        <input className="input input-bordered w-full max-w-xs"
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
                        <span className="label-text">Reason</span>
                        <span className={`label-text-alt ${charCountExceeded ? 'text-red-600' : ''}`}>
                            {charCount}/255
                        </span>
                    </label>
                    <input className="input input-bordered w-full max-w-xs" type="text"
                           placeholder="Please Type a Reason"
                           value={Reason}
                           onChange={handleReasonChange}
                    />
                </div>
                {/* TODO: create new page that appends data a new table element*/}
                {/* Button */}
                <div>
                    <button className="btn btn-primary" onClick={handleFormSubmit}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default DowntimeForm