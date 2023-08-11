import EntryPoint from "./controller/EntryPoint";
import { Downtime } from "./model/Downtime";

export const toUTC = (d: Date): Date => {
    return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds(), d.getUTCMilliseconds()));
}

export const isErrorObject = (obj: Object): boolean => {
    return Object.prototype.toString.call(obj) === "[object Error]";
}

export const isOverlap = (dateStartA: Date, dateEndA: Date, dateStartB: Date, dateEndB: Date): boolean => {
    return (dateStartA.getTime() <= dateEndB.getTime() 
    && dateStartB.getTime() <= dateEndA.getTime());
}

export const getTimestring = (date: Date) => {
    let time = "";
    const h = date.getHours();
    const m = date.getMinutes();
    const s = date.getSeconds();
    time += ((h < 10) ? "0" + h.toString() : h.toString()) + ":";
    time += ((m < 10) ? "0" + h.toString() : h.toString()) + ":";
    time += ((s < 10) ? "0" + h.toString() : h.toString());
    console.log(time);
    return time;
}

export const substringMatch = (substring: string, superstring: string) => {
    return (substring.length <= superstring.length && substring === superstring.slice(0, substring.length))
}

export const serializeData = (entryPoint: EntryPoint) => {
    localStorage.setItem('state', JSON.stringify(entryPoint));
    localStorage.setItem('downtimeDatabase', JSON.stringify(Array.from(entryPoint.downtimeDatabase.entries())));
    localStorage.setItem('telescopeGroup', JSON.stringify(Array.from(entryPoint.telescopeGroup.entries())));
    localStorage.setItem('siteGroup', JSON.stringify(Array.from(entryPoint.siteGroup.entries())));
}

export const parseData = (): EntryPoint => {
    let entryPoint: EntryPoint = JSON.parse(localStorage.getItem('state'));
    let tempDowntime: Map<string, Downtime> = new Map(localStorage.getItem('downtimeDatabase').length ? JSON.parse(localStorage.getItem('downtimeDatabase')) : []);
    let tempTelescopes: Map<string, Set<string>> = new Map(localStorage.getItem('telescopeGroup').length ? JSON.parse(localStorage.getItem('telescopeGroup')) : []);
    let tempSites: Map<string, Set<string>> = new Map(localStorage.getItem('siteGroup').length ? JSON.parse(localStorage.getItem('siteGroup')) : []);
    entryPoint.downtimeDatabase = tempDowntime;
    entryPoint.telescopeGroup = tempTelescopes;
    entryPoint.siteGroup = tempSites;
    return entryPoint;
}