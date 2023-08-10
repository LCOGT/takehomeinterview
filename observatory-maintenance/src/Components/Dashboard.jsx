import React, { useState, useEffect } from 'react';
import DowntimeEntry from './DowntimeEntry';
import EntryDetails from './EntryDetails';
import './Dashboard.css';

function Dashboard({ downtimes, setDowntimes }) {
  const [entries, setEntries] = useState([]);
  const [currentDowntime, setCurrentDowntime] = useState('');

  useEffect(() => {
    if (downtimes.length === 0) return;

    const list = downtimes.map((downtime, index) => {
      return (
        <DowntimeEntry
          key={downtime.id}
          index={index}
          downtimes={downtimes}
          setDowntimes={setDowntimes}
          currentDowntime={currentDowntime}
          setCurrentDowntime={setCurrentDowntime}
        />
      );
    });
    setEntries(list);
  }, [downtimes, setDowntimes]);

  return (
    <>
      <h1>Planned Downtimes</h1>
      <div className="dashboard">
        {downtimes.length ? (
          <table>
            <thead>
              <th>ID</th>
              <th>Site</th>
              <th>Telescope</th>
              <th>Start (UTC)</th>
              <th>End (UTC)</th>
            </thead>
            {entries}
          </table>
        ) : (
          <p>No downtimes to display.</p>
        )}
        <EntryDetails
          downtimes={downtimes}
          setDowntimes={setDowntimes}
          currentDowntime={currentDowntime}
          setCurrentDowntime={setCurrentDowntime}
        />
      </div>
    </>
  );
}

export default Dashboard;
