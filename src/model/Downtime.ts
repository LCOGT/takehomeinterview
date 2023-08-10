import { toUTC } from "./Utils";

export interface DowntimeProps {
    siteId: string,
    telescopeId: string,
    startDate: Date,
    endDate: Date,
    reason: string,
}

export interface CreateDowntimeProps {
    downtime: Downtime,
    options?: any,
}

export interface UpdateDowntimeProps {
    downtime: Downtime,
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

export default class Downtime {
    props: DowntimeProps;

    constructor(props: DowntimeProps) {
        this.props = props;

        // Process the data according to the first requirement
        this.props.siteId.toUpperCase();
        this.props.telescopeId.toUpperCase();
        this.props.startDate = toUTC(this.props.startDate);
        this.props.startDate = toUTC(this.props.endDate);
        this.props.reason.slice(0, 255);
    }
}