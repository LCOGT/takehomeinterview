import DowntimeArray from "./DowntimeArray";
import downtimeArray from "./DowntimeArray";


function DowntimeForm(){
    let newID = DowntimeArray[downtimeArray.length-1].id+1
    let newLocation;
    let newTelescope;
    let newReason = '';
    return(
        <div>
            <div>
                <select className="select w-full max-w-xs">
                    <option disabled selected>Pick Site Location</option>
                    <option>North</option>
                    <option>South</option>
                    <option>East</option>
                    <option>West</option>
                </select>
            </div>
            <div>
                <select className="select w-full max-w-xs">
                    <option disabled selected>Pick Telescope Location</option>
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                    <option>D</option>
                </select>
            </div>
        </div>
        )
}

export default DowntimeForm