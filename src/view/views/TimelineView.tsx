import React, { useEffect, useRef } from "react";
import { Downtime } from "../../model/Downtime";
import { DataGroup, DataItem, Timeline } from "vis-timeline";
import EntryPoint from "../../controller/EntryPoint";
import { TOTAL_WIDTH, sectionHeader } from "../forms/DowntimeTemplate";


export const TimelineView = (props: {
  context: EntryPoint;
  downtimes: Downtime[];
}) => {
  // Get a list of all Downtimes to populate the datasets
  let data: DataItem[] = [];
  for (const downtime of props.downtimes) {
    data.push({
      id: downtime.id,
      group: downtime.props.telescopeId,
      content: downtime.props.telescopeId,
      start: downtime.props.startDate,
      end: downtime.props.endDate,
    })
  }
  // Get a list of all Telescope names to make Vis groups.
  let group: DataGroup[] = [];
  const telescopes = Array.from(props.context.telescopeGroup.keys());
  for (const telescope of telescopes) {
    group.push({
      id: telescope,
      content: document.getElementById(""),
    });
  }

  const timelineRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const timeline = timelineRef.current && new Timeline(
      timelineRef.current,
      data,
      group,
      {
        height: 100,
        start: Date.now(),
        margin: {
          axis: 5,
          item: {
            vertical: 5,
            horizontal: 0
          }
        },
        orientation: {
          axis: "both",
          item: "top"
        },
        stack: false,
        stackSubgroups: false,
        type: "range",
        width: "100%",
        zoomable: true,
        zoomMin: 147600000,
        zoomMax: 51840000000
      }
    );
    timeline.setGroups(group);
    timeline.setItems(data);

    return () => {
      timeline.destroy();
    };
  }, [props.downtimes, timelineRef]);

  return (
    <div ref={timelineRef}>
      <div style={sectionHeader}>Timeline</div>
    </div>
  );
};
