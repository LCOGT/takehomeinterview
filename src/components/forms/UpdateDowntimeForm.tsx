import React, { useState } from "react";
import {
  CreateDowntimeProps,
  Downtime,
  DowntimeProps,
  UpdateDowntimeProps,
} from "../../model/Downtime";
import Downtimes from "../../database/Downtimes";
import { downtimeStyle } from "./DowntimeTemplate";

export const UpdateDowntimeForm = (props: {
  context: Downtimes;
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
    <form onSubmit={handleSubmit}style={downtimeStyle}
    >
      <div style={{ clear: "left" }}>
        <div style={{ float: "left" as "left", minWidth: 300 }}>
          <div>
            <label>
              Site ID: {props.downtime.id}
            </label>
          </div>
          <div>
            <label>
              Site ID: {props.downtime.props.siteId}
            </label>
          </div>
          <div>
            <label>
              Site ID: {props.downtime.props.telescopeId}
            </label>
          </div>
        </div>
        <div style={{ float: "left" as "left", minWidth: 300 }}>
          <div>
            <label>
              Start date:
              <input
                type="date"
                name="startDate"
                value={formData.startDate?.toISOString().slice(0, 10) || ""}
                onChange={handleDateInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              End date:
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

      <div>
        <label>
          Reason:
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleInputChange}
          />
        </label>
        <div
          style={{
            color: validateForm() ? "#000000" : "#ff0000",
          }}
        >
          {formData.reason.length.toString()} / 255
        </div>
      </div>

      <button type="submit">Save Changes</button>
      {errorMsg}

    </form>
  );
};
