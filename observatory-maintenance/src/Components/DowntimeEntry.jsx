import React, { useState } from 'react';

function DowntimeEntry({ index, downtimes, setDowntimes }) {
  function handleDelete(e) {
    const id = e.target.id;
    setDowntimes((prevDowntimes) => {
      return prevDowntimes.filter((downtime) => downtime.id !== id);
    });
  }

  function showReason(e) {
    const id = e.target.id;
    setDowntimes((prevDowntimes) => {
      return prevDowntimes.filter((downtime) => downtime.id === id);
    });
  }

  return (
    <tr key={downtimes[index].id} onClick={showReason}>
      <td>{downtimes[index].id}</td>
      <td>{downtimes[index].site}</td>
      <td>{downtimes[index].telescope}</td>
      <td>{downtimes[index].start}</td>
      <td>{downtimes[index].end}</td>

      <td>
        <button>Edit Reason</button>
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
