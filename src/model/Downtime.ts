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
    options?: any,
}

// Avoiding using DowntimeProps because creation of the instance forces
// field-level validation anyways.
export interface UpdateDowntimeProps {
    oldDowntimeId: string,
    startDate: Date,
    endDate: Date,
    reason: string,
    options?: any,
}

export interface ReadDowntimeProps {
    downtimeId: string,
    options?: any,
}

export interface DeleteDowntimeProps {
    downtimeId: string,
    options?: any,
}

export class Downtime {
    id: string;
    props: DowntimeProps;

    constructor(props: DowntimeProps) {
        this.id = uuidv4();
        this.props = props;

        this.reformat();
    }

    // Process the data according to the first requirement
    reformat() {
        this.props.siteId.toUpperCase();
        this.props.telescopeId.toUpperCase();
        this.props.startDate = toUTC(this.props.startDate);
        this.props.startDate = toUTC(this.props.endDate);
    }
}