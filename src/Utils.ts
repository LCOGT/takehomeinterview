export const toUTC = (d: Date): Date => {
    return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds(), d.getUTCMilliseconds()));
}

export const isErrorObject = (obj: Object): boolean => {
    return Object.prototype.toString.call(obj) === "[object Error]";
}

export const isOverlap = (dateStartA: Date, dateEndA: Date, dateStartB: Date, dateEndB: Date): boolean => {
    return ((dateStartA.getTime() <= dateStartB.getTime() && dateStartB.getTime() <= dateEndA.getTime()) || 
    (dateStartB.getTime() <= dateEndA.getTime() && dateEndA.getTime() <= dateEndB.getTime()));
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