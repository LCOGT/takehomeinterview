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
    const uid = function () {
      return Date.now().toString(36) + Math.random().toString(36);
    };
    newDowntime.id = uid();

    //Check for empty fields
    for (const key in newDowntime) {
      if (newDowntime[key] === '') {
        alert('Please fill out all fields.');
        return;
      }
    }

    //Check for valid dates
    const newStart = new Date(newDowntime.start);
    const newEnd = new Date(newDowntime.end);

    if (newStart > newEnd) {
      alert('Start date must be before end date.');
      return;
    }
    for (let i = 0; i < downtimes.length; i++) {
      const oldStart = new Date(downtimes[i].start);
      const oldEnd = new Date(downtimes[i].end);
      if (newStart < oldEnd && newEnd > oldStart) {
        alert('This downtime overlaps with an existing downtime.');
        return;
      }
    }

    //Sort and Update downtimes state
    setDowntimes(() => {
      const unsortedTimes = [...downtimes, newDowntime];
      const sortedTimes = unsortedTimes.sort((a, b) => {
        const currentStart = new Date(a.start);
        const nextStart = new Date(b.start);
        return currentStart - nextStart;
      });
      return sortedTimes;
    });

    // Reset form
    document.forms[0].reset();
    setNewDowntime({
      id: '',
      site: '',
      telescope: '',
      start: '',
      end: '',
      reason: '',
    });
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
          <span> {255 - newDowntime.reason.length} characters left</span>
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
