import React, { createContext, useContext, useState } from "react";

const DowntimeContext = createContext();

export const useDowntimeContext = () => {
  return useContext(DowntimeContext);
};

export const DowntimeProvider = ({ children }) => {
  // State
  const [downtimes, setDowntimes] = useState([]);

  // Creates a new Downtime
  const postDowntime = (obj) => {
    // Check for overlapping downtimes with the same telescope_id and telescope_site
    const overlappingDowntime = downtimes.find(
      (downtime) =>
        downtime.telescope_id === obj.telescope_id &&
        downtime.telescope_site === obj.telescope_site &&
        ((obj.time_start >= downtime.time_start &&
          obj.time_start <= downtime.time_end) ||
          (obj.time_end >= downtime.time_start &&
            obj.time_end <= downtime.time_end))
    );

    if (!overlappingDowntime) {
      setDowntimes((prevState) => [...prevState, obj]);
      return true;
    }
    return false;
  };

  // Returns a list of all downtimes
  const getDowntime = () => {
    return downtimes.sort((a, b) => a.time_start - b.time_start);
  };

  // updates the reason for a downtime
  const putReason = (text, downtime_id) => {
    console.log("saving reason");
    const downtimeToUpdate = downtimes.find(
      (downtime) => downtime.downtime_id === downtime_id
    );
    if (downtimeToUpdate) {
      downtimeToUpdate.reason = text;
      setDowntimes([...downtimes]);
      return true;
    }
    return false;
  };

  // deletes a downtime
  const deleteDowntime = (downtime_id) => {
    // Find the Index to remove
    const indexToRemove = downtimes.findIndex(
      (downtime) => downtime.downtime_id === downtime_id
    );
    if (indexToRemove !== -1) {
      downtimes.splice(indexToRemove, 1);
      setDowntimes([...downtimes]);
      return true;
    }
    return false;
  };

  return (
    <DowntimeContext.Provider
      value={{
        downtimes,
        postDowntime,
        getDowntime,
        deleteDowntime,
        putReason,
      }}
    >
      {children}
    </DowntimeContext.Provider>
  );
};
