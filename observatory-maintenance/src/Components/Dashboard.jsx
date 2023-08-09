import React, { useEffect } from 'react';

function Dashboard({ downtimes, setDowntimes }) {
  function handleDelete(e) {
    const id = e.target.id;
    setDowntimes((prevDowntimes) => {
      return prevDowntimes.filter((downtime) => downtime.id !== id);
    });
  }

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
                <td>
                  <button>Edit</button>
                </td>
                <td>
                  <button id={downtime.id} onClick={handleDelete}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No downtimes to display.</p>
      )}
    </div>
  );
}

export default Dashboard;
