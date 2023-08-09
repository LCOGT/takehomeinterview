import React, { useState, useEffect } from 'react';
import _uniqueId from 'lodash/uniqueId';
import './AddDowntime.css';

function AddDowntime({ newDowntime, setNewDowntime, setDowntimes, downtimes }) {
  function convertLocaltoUTC(dateString) {
    const date = new Date(dateString);
    return date.toUTCString();
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log('submitted form', newDowntime);
    for (const key in newDowntime) {
      newDowntime.id = _uniqueId('downtime_');
      if (newDowntime[key] === '') {
        alert('Please fill out all fields');
        return;
      }
      setDowntimes(() => {
        return [...downtimes, newDowntime];
      });
    }
  }

  return (
    <>
      <div>
        <h1>Add Downtime</h1>

        <form>
          <label htmlFor="site">Site</label>
          <input
            type="text"
            id="site"
            name="site"
            required
            onChange={(e) => {
              setNewDowntime({
                ...newDowntime,
                site: e.target.value.toLowerCase(),
              });
            }}
          />
          <label htmlFor="telescope">Telescope</label>
          <input
            type="text"
            id="telescope"
            name="telescope"
            required
            onChange={(e) => {
              setNewDowntime({
                ...newDowntime,
                telescope: e.target.value.toLowerCase(),
              });
            }}
          />
          <label htmlFor="start">Start (UTC Time Required)</label>
          <input
            type="datetime-local"
            id="start"
            name="start"
            required
            onChange={(e) => {
              const convertedTime = convertLocaltoUTC(e.target.value);
              setNewDowntime({ ...newDowntime, start: convertedTime });
            }}
          />
          <label htmlFor="end">End (UTC Time Required)</label>
          <input
            type="datetime-local"
            id="end"
            name="end"
            required
            onChange={(e) => {
              const convertedTime = convertLocaltoUTC(e.target.value);
              setNewDowntime({ ...newDowntime, end: convertedTime });
            }}
          />
          <label htmlFor="reason">Reason</label>
          {/* <span> {255 - newDowntime.reason.length} characters left</span> */}
          <textarea
            type="text"
            id="reason"
            name="reason"
            required
            maxLength="255"
            onChange={(e) => {
              setNewDowntime({ ...newDowntime, reason: e.target.value });
            }}
          />
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default AddDowntime;
