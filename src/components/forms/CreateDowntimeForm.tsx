import React, { useState } from 'react';
import { CreateDowntimeProps, DowntimeProps } from '../../model/Downtime';
import Downtimes from '../../database/Downtimes';


export const CreateDowntimeForm = (props: {
    context: Downtimes, 
}) => {
    const [formData, setFormData] = useState<DowntimeProps>({
        siteId: '',
        telescopeId: '',
        startDate: new Date(),
        endDate: new Date(),
        reason: '',
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
        props.context.createDowntime({downtimeProps: {
            siteId: formData.siteId,
            telescopeId: formData.telescopeId,
            startDate: formData.startDate,
            endDate: formData.endDate,
            reason: formData.reason,
        }})

        setFormData({
            siteId: '',
            telescopeId: '',
            startDate: new Date(),
            endDate: new Date(),
            reason: '',
          });
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