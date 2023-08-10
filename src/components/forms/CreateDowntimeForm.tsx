import React, { useState } from "react";
import { CreateDowntimeProps, DowntimeProps } from "../../model/Downtime";
import Downtimes from "../../database/Downtimes";

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
    return (formData.reason.length < 255);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm) {
      setErrorMsg("Form is invalid, reason is longer than 255 characters. ");
    } else {
      // Entry point
      const result = props.context.createDowntime({
        downtimeProps: {
          siteId: formData.siteId,
          telescopeId: formData.telescopeId,
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
      }
      props.redux();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Site ID:
          <input
            type="text"
            name="siteId"
            value={formData.siteId}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div>
        <label>
          Telescope ID:
          <input
            type="text"
            name="telescopeId"
            value={formData.telescopeId}
            onChange={handleInputChange}
          />
        </label>
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
      <button type="submit">Submit</button>
      {errorMsg}
    </form>
  );
};
