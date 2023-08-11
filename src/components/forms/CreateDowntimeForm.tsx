import React, { useState } from "react";
import { DowntimeProps } from "../../model/Downtime";
import Downtimes from "../../database/Downtimes";
import {
  COL1_WIDTH,
  COL2_WIDTH,
  columnStyle,
  sectionHeader,
  sectionContainer,
  entryContainer,
  entryKeyStyle,
  entryValueStyle,
} from "./DowntimeTemplate";

export const CreateDowntimeForm = (props: {
  context: Downtimes;
  redux: () => any;
}) => {
  const [formData, setFormData] = useState<DowntimeProps>({
    siteId: "",
    telescopeId: "",
    startDate: new Date(),
    endDate: new Date(),
    reason: "",
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm) {
      setErrorMsg("Form is invalid, reason is longer than 255 characters. ");
    } else {
      // Entry point
      const result = props.context.createDowntime({
        downtimeProps: {
          siteId: formData.siteId.toUpperCase(),
          telescopeId: formData.telescopeId.toUpperCase(),
          startDate: formData.startDate,
          endDate: formData.endDate,
          reason: formData.reason,
        },
      });
      if (!result) {
        setErrorMsg(
          "Start dates and end dates overlap with existing downtimes. Please change them. "
        );
      } else {
        setFormData({
          siteId: "",
          telescopeId: "",
          startDate: new Date(),
          endDate: new Date(),
          reason: "",
        });
        setErrorMsg("");
      }
      props.redux();
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{...sectionContainer}}>
      <div style={sectionHeader}>Add new Downtime</div>
      <div style={{ backgroundColor: "#ffffff" }}>
        <div style={{ minWidth: 300 }}>
          <div
            style={{
              ...columnStyle,
              float: "left" as "left",
              minWidth: COL1_WIDTH,
            }}
          >
            <div style={entryContainer}>
              <div style={entryKeyStyle}>Site Name:</div>
              <label style={entryValueStyle}>
                <input
                  type="text"
                  name="siteId"
                  value={formData.siteId}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div style={entryContainer}>
              <div style={entryKeyStyle}>Telescope Name:</div>
              <label style={entryValueStyle}>
                <input
                  type="text"
                  name="telescopeId"
                  value={formData.telescopeId}
                  onChange={handleInputChange}
                />
              </label>
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
                  value={formData.startDate?.toISOString().slice(0, 10) || ""}
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
                  value={formData.endDate?.toISOString().slice(0, 10) || ""}
                  onChange={handleDateInputChange}
                />
              </label>
            </div>
          </div>
        </div>

        <div style={{ ...columnStyle, clear: "both" }}>
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
        
        <div style={columnStyle}>
          <button type="submit">Submit</button>
          {errorMsg}
        </div>
      </div>
    </form>
  );
};
