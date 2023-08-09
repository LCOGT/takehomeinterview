import React, { useEffect } from 'react';

function Dashboard({ downtimes, setDowntimes }) {
  //Sort downtimes by start date
  useEffect(
    () => {
      const sortedDowntimes = downtimes.sort((a, b) => a.start - b.start);
      setDowntimes(sortedDowntimes);
    },
    { downtimes }
  );

  return (
    <div className="Dashboard">
      <h1>Planned Downtimes</h1>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Site</th>
            <th>Telescope</th>
            <th>Start</th>
            <th>End</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          {downtimes.map((downtime) => (
            <tr key={downtime.id}>
              <td>{downtime.id}</td>
              <td>{downtime.site}</td>
              <td>{downtime.telescope}</td>
              <td>{downtime.start}</td>
              <td>{downtime.end}</td>
              <td>{downtime.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
