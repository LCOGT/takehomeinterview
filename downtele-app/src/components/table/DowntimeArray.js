// import React, { useState } from 'react';
import moment from "moment";

let downtimeArray = [
    {
        id: 1,
        site: 'North',
        telescope: 'A',
        start: moment('2023-08-06T21:48:00').format('LLL'),
        end: moment('2023-08-06T21:51:00').format('LLL'),
        reason: 'System Reboot'
    },
    {
        id: 2,
        site: 'East',
        telescope: 'C',
        start: moment('2023-08-06T21:40').format('LLL'),
        end: moment('2023-08-06T22:57').format('LLL'),
        reason: 'Calibration'
    },
    {
        id: 3,
        site: 'West',
        telescope: 'A',
        start: moment('2023-08-06T22:21').format('LLL'),
        end: moment('2023-08-07T23:51').format('LLL'),
        reason: 'Maintenance'
    },
]

export default downtimeArray;