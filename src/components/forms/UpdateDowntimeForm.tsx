import React, { useState } from 'react';
import { CreateDowntimeProps, Downtime, DowntimeProps, UpdateDowntimeProps } from '../../model/Downtime';
import Downtimes from '../../database/Downtimes';


export const UpdateDowntimeForm = (props: {
    context: Downtimes, 
    downtime: Downtime,
}) => {
    const [formData, setFormData] = useState<UpdateDowntimeProps>({
        oldDowntimeId: props.downtime.id,
        startDate: props.downtime.props.startDate,
        endDate: props.downtime.props.endDate,
        reason: props.downtime.props.reason,
      });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDateInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const dateValue = value ? new Date(value) : null;
        setFormData({ ...formData, [name]: dateValue });
    };

      const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Handle form submission here, e.g., send data to a server
        props.context.updateDowntime({
            oldDowntimeId: formData.oldDowntimeId,
            startDate: formData.startDate,
            endDate: formData.endDate,
            reason: formData.reason,
        });
      };
    
      return (
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Reason:
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div>
            <label>
              Start date:
              <input
                type="date"
                name="startDate"
                value={formData.startDate?.toISOString().slice(0, 10) || ''}
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
                value={formData.endDate?.toISOString().slice(0, 10) || ''}
                onChange={handleDateInputChange}
              />
            </label>
          </div>
          <button type="submit">Submit</button>
        </form>
      );
      }