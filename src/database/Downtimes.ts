import { Downtime, CreateDowntimeProps, DeleteDowntimeProps, ReadDowntimeProps, UpdateDowntimeProps } from "../model/Downtime";
import { isErrorObject, isOverlap } from "../Utils";

const LOG = true;

export default class Downtimes {
    downtimeDatabase: Map<string, Downtime>; // The main database of all Downtimes by their ID
    telescopeGroup: Map<string, Set<string>>; // Mappings from single telescopeID to all its downtimeIDs
    siteGroup: Map<string, Set<string>>; // Mappings from a single siteGroupID to all telescopeIDs
    counter: number;
    constructor() {
        this.counter = 0;
        this.downtimeDatabase = new Map();
        this.telescopeGroup = new Map();
        this.siteGroup = new Map();
    }

    redux() {
        let redux = new Downtimes();
        redux.downtimeDatabase = this.downtimeDatabase;
        redux.telescopeGroup = this.telescopeGroup;
        redux.siteGroup = this.siteGroup;
        return redux;
    }

    getDowntimes() {
        let downtimes: Downtime[] = [];
        this.downtimeDatabase.forEach((value: Downtime, key: string) => {
            downtimes.push(value);
        })
        return downtimes;
    }

    // A boolean function that determines if a Downtime is overlapping with any corresponding telescopes or not.
    validateDowntime(newDowntime: Downtime, newStartDate?: Date, newEndDate?: Date): boolean {
        let overlap: boolean = false;
        this.getTelescopeDowntimes(newDowntime.props.telescopeId).forEach((existingDowntime: Downtime) => {
            if (isOverlap(
                existingDowntime.props.startDate, 
                existingDowntime.props.endDate, 
                newStartDate ? newStartDate : newDowntime.props.startDate, 
                newEndDate ? newEndDate : newDowntime.props.endDate)) {
                if (existingDowntime.id !== newDowntime.id) {
                    overlap = true;
                }
            }
        });
        return !overlap;
    }

    // Create or update a Telescope. This is implicitly called from Downtime CRUD operations.
    createTelescope(telescopeId: string): boolean | Error {
        this.telescopeGroup.set(telescopeId, new Set());
        return true;
    }

    // Get a list of all downtimes associated with a telescope by ID.
    getTelescopeDowntimes(telescopeId: string): Downtime[] {
        const downtimeIDs = this.telescopeGroup.get(telescopeId);
        if (downtimeIDs) {
            let downtimes: Downtime[] = [];
            for (const downtimeId of Array.from(downtimeIDs)) {
                let downtime = this.readDowntime({downtimeId: downtimeId});
                if (downtime) {
                    downtimes.push(downtime);
                }
            }
            return downtimes;
        } else {
            return [];
        }
    }

    // Delete a Telescope by ID, along with all its downtimes.
    deleteTelescope(telescopeId: string): boolean | Error {
        const downtimes = this.getTelescopeDowntimes(telescopeId);
        if (!isErrorObject(downtimes)) {
            downtimes.forEach((downtime: Downtime) => this.deleteDowntime({downtimeId: downtime.id}));
            this.telescopeGroup.delete(telescopeId);
            return true;
        } else {
            return new Error("Unable to delete telescope. ")
        } 
    }

    // Create a Downtime, and the Telescope if it doesn't already exist, and return the new ID. or return an error of overlaps are detected.
    createDowntime(props: CreateDowntimeProps): string | null {
        const telescopeId: string = props.downtimeProps.telescopeId;
        if (!this.telescopeGroup.has(telescopeId)) this.createTelescope(telescopeId);
        const downtime = new Downtime(props.downtimeProps)
        if (this.validateDowntime(downtime)) {
            this.downtimeDatabase.set(downtime.id, downtime);
            this.telescopeGroup.get(telescopeId)?.add(downtime.id);
            LOG && console.log("Successfully created downtime {}", downtime.id);
            return downtime.id;
        } else {
            LOG && console.log("Error creating downtime: timeframe validation error");
            return null;
        }
    }

    // Get a Downtime by ID, or an error if it does not exist.
    readDowntime(props: ReadDowntimeProps): Downtime | null {
        const result = this.downtimeDatabase.get(props.downtimeId);
        if (result) {
            return result;
        } else {
            return null;
        }
    }

    // Attempt to replace the existing Downtime
    updateDowntime(props: UpdateDowntimeProps): boolean | Error {
        const downtime = this.readDowntime({downtimeId: props.oldDowntimeId});
        if (downtime) {
            if (this.validateDowntime(downtime, props.startDate, props.endDate)) {
                this.downtimeDatabase.set(downtime.id, downtime);
                return true;
            } else {
                return new Error("Unable to update downtime due to overlaps with existing downtime. ")
            }
        } else {
            return new Error("Downtime does not exist. ")
        }    
    }

    // Delete the Downtime, and also its corresponding instance in its telescope group.
    deleteDowntime(props: DeleteDowntimeProps): boolean | Error {
        const downtime = this.downtimeDatabase.get(props.downtimeId);
        if (downtime) {
            this.downtimeDatabase.delete(downtime.id);
            this.telescopeGroup.get(downtime.props.telescopeId)?.delete(downtime.id);
            return true;
        } else {
            return new Error("Downtime does not exist. ")
        }
    }
}