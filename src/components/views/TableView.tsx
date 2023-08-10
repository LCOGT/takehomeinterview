import { useEffect, useState } from "react";
import Downtimes from "../../database/Downtimes";
import { Downtime } from "../../model/Downtime";
import { ReadAndDeleteDowntimeForm } from "../forms/ReadAndDeleteDowntimeForm";
import { CreateDowntimeForm } from "../forms/CreateDowntimeForm";



export const TableView = (props: {context: Downtimes}) => {
    const [downtimes, setDowntimes] = useState<Downtime[]>(props.context.getDowntimes());
    const [myTime, setMyTime] = useState(new Date());
    const [showAddForm, setShowAddForm] = useState<boolean>(true);

    const forceUpdate = () => {
        setDowntimes(props.context.getDowntimes());
        // setDowntimes(downtimes.redux());
    }

    const toggleAddForm = (event: React.MouseEvent<HTMLInputElement>) => {
        setShowAddForm(!showAddForm);
    }
   // console.log(downtimes.getDowntimes());
    return (<div>
        <div onMouseDown={toggleAddForm}>
            {showAddForm ? "Hide form" : "Add new Downtime"}
        </div>
        {toggleAddForm && <CreateDowntimeForm 
            context={props.context}
            redux={forceUpdate}
        />}
        {downtimes.map((downtime: Downtime) => <ReadAndDeleteDowntimeForm 
            context={props.context}
            redux={forceUpdate}
            downtime={downtime}
        />)}
    </div>);
}