import React, { useState, useEffect } from 'react';
import DowntimeEntry from './DowntimeEntry';

function Dashboard({ downtimes, setDowntimes }) {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    if (downtimes.length === 0) return;

    const list = downtimes.map((downtime, index) => {
      return (
        <DowntimeEntry
          key={downtime.id}
          index={index}
          downtimes={downtimes}
          setDowntimes={setDowntimes}
        />
      );
    });
    setEntries(list);
  }, [downtimes, setDowntimes]);

  return (
    <div className="Dashboard">
      <h1>Planned Downtimes</h1>

      {downtimes.length ? (
        <table className="sortable">
          <thead>
            <tr className="item">
              <th>ID</th>
              <th>Site</th>
              <th>Telescope</th>
              <th>Start (UTC)</th>
              <th>End (UTC)</th>
            </tr>
          </thead>
          <tbody>{entries}</tbody>
        </table>
      ) : (
        <p>No downtimes to display.</p>
      )}
    </div>
  );
}

export default Dashboard;
