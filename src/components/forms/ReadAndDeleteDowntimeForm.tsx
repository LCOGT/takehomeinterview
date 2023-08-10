import React, { useState } from 'react';
import { CreateDowntimeProps, Downtime, DowntimeProps, UpdateDowntimeProps } from '../../model/Downtime';
import Downtimes from '../../database/Downtimes';
import { UpdateDowntimeForm } from './UpdateDowntimeForm';


export const ReadAndDeleteDowntimeForm = (props: {
    context: Downtimes; 
    downtime: Downtime;
    redux: () => any;
}) => {
    const [expanded, setExpanded] = useState<boolean>(false);
    const [updateMode, setUpdateMode] = useState<boolean>(false);

    const toggleExpand = (event: React.MouseEvent<HTMLInputElement>) => {
        setExpanded(!expanded);
    }

    const toggleUpdate = (event: React.MouseEvent<HTMLInputElement>) => {
        setUpdateMode(!updateMode);
    }

    const handleDelete = (event: React.MouseEvent<HTMLInputElement>) => {
        props.context.deleteDowntime({downtimeId: props.downtime.id})
        props.redux();
    }

    return (<div>
        <div onMouseDown={toggleExpand}>
            +
        </div>
        <div onMouseDown={toggleUpdate}>
            {updateMode ? "Go back" : "Update"}
        </div>
        {updateMode ? (
            <UpdateDowntimeForm context={props.context} redux={props.redux} downtime={props.downtime} />
        ) : (<div>
            <div> Downtime ID: {props.downtime.id}</div>
            <div> Site ID: {props.downtime.props.siteId}</div>
            <div> Telescope ID: {props.downtime.props.telescopeId}</div>
            <div> Start Date: {props.downtime.props.startDate.toISOString()}</div>
            <div> End Date: {props.downtime.props.endDate.toISOString()}</div>
            {expanded && <div>
                <div> Reason: {props.downtime.props.reason}</div>
            </div>}
            <div onMouseDown={handleDelete}>
                Delete
            </div>
        </div>
        )}
    </div>)
}