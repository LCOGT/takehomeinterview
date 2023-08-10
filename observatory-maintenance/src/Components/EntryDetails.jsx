import React, { useState } from 'react';

function EntryDetails({
  downtimes,
  setDowntimes,
  currentDowntime,
  setCurrentDowntime,
}) {
  const [currentDetail, setCurrentDetail] = useState('');
  const currentDowntimeDetails = downtimes.filter(
    (downtime) => downtime.id === currentDowntime
  );

  function handleReasonSave(e) {
    e.preventDefault();
    const id = currentDowntimeDetails[0].id;
    const reason = e.target.form.reason.value;
    const newDowntimes = downtimes.map((downtime) => {
      return downtime.id === id ? { ...downtime, reason: reason } : downtime;
    });
    setDowntimes(newDowntimes);
    setCurrentDetail('');
  }

  return (
    <div className="details-container">
      <div>
        {currentDowntime.length ? (
          <>
            <div className="entry-details">Further Details</div>
            <p>
              Reason for Downtime: {'\n'}
              {currentDowntimeDetails[0].reason}
            </p>
            <form>
              <label htmlFor="reason">Update Reason</label>
              <textarea
                name="reason"
                onChange={(e) => setCurrentDetail(e.target.value)}
                value={currentDetail}
              ></textarea>
              <button onClick={handleReasonSave}>Save</button>
            </form>
          </>
        ) : (
          <p>Click Details on an entry to see details.</p>
        )}
      </div>
    </div>
  );
}

export default EntryDetails;
