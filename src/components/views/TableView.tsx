import { useState } from "react";
import Downtimes from "../../database/Downtimes";
import { Downtime } from "../../model/Downtime";
import { ReadAndDeleteDowntimeForm } from "../forms/ReadAndDeleteDowntimeForm";
import { CreateDowntimeForm } from "../forms/CreateDowntimeForm";

export const TableView = (props: {context: Downtimes}) => {
    const [showAddForm, setShowAddForm] = useState<boolean>();
    const toggleAddForm = (event: React.MouseEvent<HTMLInputElement>) => {
        setShowAddForm(!showAddForm);
    }
    return (<div>
        <div onMouseDown={toggleAddForm}>
            {showAddForm ? "Hide form" : "Add new Downtime"}
        </div>
        {toggleAddForm && <CreateDowntimeForm 
            context={props.context}
        />}
        {props.context.getDowntimes().map((downtime: Downtime) => <ReadAndDeleteDowntimeForm 
            context={props.context}
            downtime={downtime}
        />)}
    </div>);
}