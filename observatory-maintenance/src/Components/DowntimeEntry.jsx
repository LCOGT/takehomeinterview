import React, { useState } from 'react';
import './DowntimeEntry.css';

function DowntimeEntry({
  index,
  downtimes,
  setDowntimes,
  currentDowntime,
  setCurrentDowntime,
}) {
  function handleDelete(e) {
    const id = e.target.id;
    setCurrentDowntime('');
    setDowntimes((prevDowntimes) => {
      return prevDowntimes.filter((downtime) => downtime.id !== id);
    });
  }

  function handleEdit(e) {
    e.preventDefault();
    const id = e.target.id;
  }

  function showDetails(e) {
    e.preventDefault();
    const id = e.target.id;
    setCurrentDowntime(id);
  }

  return (
    <tr key={downtimes[index].id}>
      <td>{downtimes[index].id}</td>
      <td>{downtimes[index].site}</td>
      <td>{downtimes[index].telescope}</td>
      <td>{downtimes[index].start}</td>
      <td>{downtimes[index].end}</td>

      <td>
        <button id={downtimes[index].id} onClick={showDetails}>
          Details
        </button>
      </td>
      <td>
        <button id={downtimes[index].id} onClick={handleDelete}>
          Delete
        </button>
      </td>
    </tr>
  );
}

export default DowntimeEntry;
