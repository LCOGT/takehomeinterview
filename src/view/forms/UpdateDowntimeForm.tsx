import React, { useState } from "react";
import {
  Downtime,
  UpdateDowntimeProps,
} from "../../model/Downtime";
import EntryPoint from "../../controller/EntryPoint";
import { COL1_WIDTH, COL2_WIDTH, columnStyle, sectionContainer, entryContainer, entryKeyStyle, entryValueStyle, sectionHeader } from "./Styles";

export const UpdateDowntimeForm = (props: {
  context: EntryPoint;
  downtime: Downtime;
  redux: () => any;
  callback: () => any;
}) => {
  const [formData, setFormData] = useState<UpdateDowntimeProps>({
    oldDowntimeId: props.downtime.id,
    startDate: props.downtime.props.startDate,
    endDate: props.downtime.props.endDate,
    reason: props.downtime.props.reason,
  });
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    const dateValue = value ? new Date(value) : null;
    setFormData({ ...formData, [name]: dateValue });
  };

  const validateForm = (): boolean => {
    return formData.reason.length < 255;
  };

  const handleCancel = (event: any) => {
    props.callback();
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm) {
      setErrorMsg("Form is invalid, reason is longer than 255 characters. ")
    } else {
      // Entry point
      const result = props.context.updateDowntime({
        oldDowntimeId: formData.oldDowntimeId,
        startDate: formData.startDate,
        endDate: formData.endDate,
        reason: formData.reason,
      });
      if (!result) {
        setErrorMsg(
          "Start dates and end dates overlap with existing downtimes. Please change them. "
        );
      }
    }
    props.redux();
    props.callback();
  };

  return (
    <form onSubmit={handleSubmit}style={sectionContainer}>
      <div style={sectionHeader}>{props.downtime.props.telescopeId}</div>
      <div style={{ clear: "left" }}>
        <div
            style={{
              ...columnStyle,
              float: "left" as "left",
              minWidth: COL1_WIDTH,
            }}
          >
            <label style={entryValueStyle}>
            <div style={entryContainer}>
              <div style={entryKeyStyle}>Reason:</div>
            </div>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleInputChange}
              style={{ margin: 5 }}
            />
          </label>
          <div
            style={{
              color: validateForm() ? "#000000" : "#ff0000",
              fontSize: 10,
              margin: 5,
            }}
          >
            {formData.reason.length.toString()} / 255
          </div>
        </div>
        <div
            style={{
              ...columnStyle,
              float: "right" as "right",
              minWidth: COL2_WIDTH,
            }}
          >
            <div style={entryContainer}>
              <div style={entryKeyStyle}>Start Date:</div>
              <label style={entryValueStyle}>
                <input
                  type="date"
                  name="startDate"
                  value={(new Date(formData.startDate))?.toISOString().slice(0, 10) || ""}
                  onChange={handleDateInputChange}
                />
              </label>
            </div>
            <div style={entryContainer}>
              <div style={entryKeyStyle}>End Date:</div>
              <label style={entryValueStyle}>
                <input
                  type="date"
                  name="endDate"
                  value={(new Date(formData.endDate))?.toISOString().slice(0, 10) || ""}
                  onChange={handleDateInputChange}
                />
              </label>
            </div>
          </div>
      </div>

      <div style={{ ...columnStyle, clear: "both" }}>
          
        </div>
        
        <div style={columnStyle}>
          <button onMouseDown={handleCancel}>Cancel</button>
          <button type="submit">Submit</button>
          {errorMsg}
        </div>

    </form>
  );
};



