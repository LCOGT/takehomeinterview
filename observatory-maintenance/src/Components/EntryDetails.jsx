import React, { useState, useEffect } from 'react';

function EntryDetails({
  downtimes,
  setDowntimes,
  currentDowntime,
  setCurrentDowntime,
}) {
  const [currentDetail, setCurrentDetail] = useState({});
  const currentDowntimeDetails = downtimes.filter(
    (downtime) => downtime.id === currentDowntime
  );

  return (
    <>
      <div className="entry-details">Further Details</div>
      <div>
        {currentDowntime.length ? (
          <form>
            <label htmlFor="reason">Reason for Downtime</label>
            <textarea defaultValue={currentDowntimeDetails.reason}></textarea>
            <button>Save</button>
          </form>
        ) : (
          <p>Click Details on an entry to see details.</p>
        )}
      </div>
    </>
  );
}

export default EntryDetails;
