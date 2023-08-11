import React, { useState } from "react";
import {
  CreateDowntimeProps,
  Downtime,
  DowntimeProps,
  UpdateDowntimeProps,
} from "../../model/Downtime";
import Downtimes from "../../database/Downtimes";
import { UpdateDowntimeForm } from "./UpdateDowntimeForm";
import { COL1_WIDTH, COL2_WIDTH, TOTAL_WIDTH, downtimeStyle, entryContainer, toggleTextStyle } from "./DowntimeTemplate";

export const ReadAndDeleteDowntimeForm = (props: {
  context: Downtimes;
  downtime: Downtime;
  redux: () => any;
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [updateMode, setUpdateMode] = useState<boolean>(false);

  const toggleExpand = (event: React.MouseEvent<HTMLInputElement>): void => {
    setExpanded(!expanded);
  };

  const toggleUpdate = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setUpdateMode(!updateMode);
  };

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>): void => {
    props.context.deleteDowntime({ downtimeId: props.downtime.id });
    props.redux();
  };

  const updateCallback = () => {
    setUpdateMode(false);
  }

  return (
    <div>
      {updateMode ? (
        <UpdateDowntimeForm
          context={props.context}
          downtime={props.downtime}
          redux={props.redux}
          callback={updateCallback}
        />
      ) : (
        <div style={downtimeStyle}>
          <div style={{minWidth: TOTAL_WIDTH, minHeight: 100, textAlign: "left", height: "100%" }} >
            <div style={{ float: "left" as "left", maxWidth: COL1_WIDTH, padding: 5 }}>
                <div style={entryContainer}>Downtime ID: {props.downtime.id}</div>
                <div style={entryContainer}>Site ID: {props.downtime.props.siteId}</div>
                <div style={entryContainer}>Telescope ID:{props.downtime.props.telescopeId}</div>
            </div>
            <div style={{ float: "left" as "left", minWidth: COL2_WIDTH }}>
                <div style={entryContainer}> Start Date: {props.downtime.props.startDate.toISOString()} </div>
                <div style={entryContainer}> End Date: {props.downtime.props.endDate.toISOString()} </div>
            </div>
            {props.downtime.props.reason ? (
              <div style={{ float: "right" as "right" }}>
                <button onMouseDown={toggleUpdate}> Update </button>
              </div>
            ) : (
              <></>
            )}
            <div style={{ float: "right" as "right" }}>
              <div style={toggleTextStyle} onMouseDown={toggleExpand}> {expanded ? "-" : "+"} </div>
            </div>
          </div>
          {expanded && (
            <div style={{ clear: "both" as "both" }}>
              <div>
                <div style={entryContainer}>Reason: {props.downtime.props.telescopeId}</div>
              </div>
              <div>
                <button onMouseDown={toggleUpdate}> Edit </button>
                <button onMouseDown={handleDelete}> Delete </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
