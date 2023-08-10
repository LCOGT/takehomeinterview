import React, { useState } from 'react';
import { CreateDowntimeProps, Downtime, DowntimeProps, UpdateDowntimeProps } from '../../model/Downtime';
import Downtimes from '../../database/Downtimes';


export const ReadAndDeleteDowntimeForm = (props: {
    context: Downtimes, 
    downtime: Downtime,
}) => {
    
    const handleDelete = (event: React.MouseEvent<HTMLInputElement>) => {
        props.context.deleteDowntime({downtimeId: props.downtime.id})
    }

    return (<div>
        <div>{props.downtime.id}</div>
        <div> Site ID: {props.downtime.props.siteId}</div>
        <div> Telescope ID: {props.downtime.props.telescopeId}</div>
        <div> Start Date: {props.downtime.props.startDate.toISOString()}</div>
        <div> End Date: {props.downtime.props.endDate.toISOString()}</div>
        <div> Reason: {props.downtime.props.reason}</div>
        <div onMouseDown={handleDelete}>
            Delete
        </div>
    </div>)
}