import React, { useState } from "react";
import {
  Downtime,
} from "../../model/Downtime";
import EntryPoint from "../../controller/EntryPoint";
import { UpdateDowntimeForm } from "./UpdateDowntimeForm";
import { COL1_WIDTH, COL2_WIDTH, TOTAL_WIDTH, columnStyle, sectionHeader, sectionContainer, entryContainer, entryKeyStyle, entryValueStyle, toggleTextStyle } from "./Styles";

export const ReadAndDeleteDowntimeForm = (props: {
  context: EntryPoint;
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
        <div style={sectionContainer}>
          <div style={sectionHeader}>{props.downtime.props.telescopeId}</div>
          <div style={{minWidth: TOTAL_WIDTH, minHeight: 100, textAlign: "left", height: "100%" }} >
            <div style={{ ...columnStyle, float: "left" as "left", minWidth: COL1_WIDTH, padding: 5 }}>
                <div style={entryContainer}>
                  <div style={entryKeyStyle}> Site: </div>
                  <div style={entryValueStyle}>{props.downtime.props.siteId}</div>
                </div>
                <div style={entryContainer}>
                  <div style={entryKeyStyle}>Downtime ID: </div>
                  <div style={entryValueStyle}>{expanded ? props.downtime.id : (props.downtime.id.slice(0, 10) + "...")}</div>
                </div>
            </div>
            <div style={{ ...columnStyle, float: "right" as "right", minWidth: COL2_WIDTH }}>
                <div style={entryContainer}>
                  <div style={entryKeyStyle}> Start Date: </div>
                  <div style={entryValueStyle}> {(new Date(props.downtime.props.startDate)).toISOString().slice(0, 10)} </div>
                </div>
                <div style={entryContainer}> 
                  <div style={entryKeyStyle}> End Date: </div>
                  <div style={entryValueStyle}> {(new Date(props.downtime.props.endDate)).toISOString().slice(0, 10)} </div>
                </div>
            </div>    
          </div>
          <div style={{clear: "both" as "both"}}>
              <div>
              {expanded && (
                 <label style={entryValueStyle}>
                 <div style={entryContainer}>
                   <div style={{...entryKeyStyle, marginLeft: 10}}>Reason:</div>
                 </div>
                 <div style={{margin: 15,}}>{props.downtime.props.reason}</div>

               </label>
              )}
              </div>
              <div>
                <button onMouseDown={toggleUpdate}> Edit </button>
                <button onMouseDown={handleDelete}> Delete </button>
                <div style={{ float: "right" as "right", color: "#aaaaff", fontWeight: 600, }}>
              <div style={toggleTextStyle} onMouseDown={toggleExpand}> {expanded ? "-" : "+"} </div>
            </div>
              </div>
            </div>
        </div>
      )}
    </div>
  );
};