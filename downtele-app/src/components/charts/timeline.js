import React, { useEffect } from "react";
import { Timeline } from "vis-timeline/standalone";
import "./timeline.css";
import 'vis-timeline/styles/vis-timeline-graph2d.css'

function Time_line() {
    useEffect (() => {
        const chartType = document.getElementById('timeline');
        const datacheck = localStorage.getItem('downtimeArray');
        if (datacheck){
        const info = JSON.parse(localStorage.getItem('downtimeArray')).map(item => ({
            id: item.id,
            start: new Date(item.start),
            end: new Date(item.end),
            content: `ID# ${item.id}`,
            group: `${item.site} - ${item.telescope}`,
        }));
        const grouping = [...new Set(info.map(item => item.group))];
        const options = {};

        const graph = new Timeline(chartType, info, options);
        graph.setGroups(grouping.map(group => ({id: group, content: group})));
        return () => {
            graph.destroy();
        };
    }
    }, []);
    return (
        <div>
            <div>
                <h2 className="text-center font-bold text-xl mb-4">Downtime Timeline</h2>
            </div>
            <div>
                <div id="timeline"></div>
            </div>
        </div>

    );
}

export default Time_line