import { toUTC } from "../Utils";
import {v4 as uuidv4} from 'uuid';

export interface DowntimeProps {
    siteId: string,
    telescopeId: string,
    startDate: Date,
    endDate: Date,
    reason: string,
}

export interface CreateDowntimeProps {
    downtimeProps: DowntimeProps,
}

export interface UpdateDowntimeProps {
    oldDowntimeId: string,
    startDate: Date,
    endDate: Date,
    reason: string,
}

export interface ReadDowntimeProps {
    downtimeId: string,
}

export interface DeleteDowntimeProps {
    downtimeId: string,
}

export class Downtime {
    id: string;
    props: DowntimeProps;

    constructor(props: DowntimeProps) {
        this.id = uuidv4();
        this.props = props;
        
        // Process the data according to the assessment requirement
        this.props.siteId.toUpperCase();
        this.props.telescopeId.toUpperCase();
        this.props.startDate = toUTC(this.props.startDate);
        this.props.endDate = toUTC(this.props.endDate);
    }
}