import Downtime from "../model/Downtime";

export default class Downtimes {
    downtimeDatabase: Map<string, Downtime>; // The main database of all Downtimes by their ID
    telescopeGroup: Map<string, string>; // Mappings from single telescopeID to all its downtimeIDs
    siteGroup: Map<string, string>; // Mappings from a single siteGroupID to all telescopeIDs

    constructor() {
        this.downtimeDatabase = new Map();
        this.telescopeGroup = new Map();
        this.siteGroup = new Map();
    }

    validateDowntime(downtime: Downtime): boolean | Error {
        return true; // TODO
    }

    getTelescopeDowntimes(telescopeId: string): Downtime[] {
        return []; // TODO
    }

    createDowntime(downtime: Downtime, props?: any) {
        
    }
}