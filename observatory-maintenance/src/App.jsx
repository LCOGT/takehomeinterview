import React, { useState } from 'react';
import './App.css';
import AddDowntime from './Components/AddDowntime';
import Dashboard from './Components/Dashboard';

function App() {
  const [newDowntime, setNewDowntime] = useState({
    id: '',
    site: '',
    telescope: '',
    start: '',
    end: '',
    reason: '',
  });
  const [downtimes, setDowntimes] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="App">
      <h1>Observatory Maintenance</h1>
      <button onClick={() => setShowAddForm(!showAddForm)}>
        {showAddForm ? 'Hide' : 'Add Downtime'}
      </button>

      {showAddForm ? (
        <div>
          <AddDowntime
            newDowntime={newDowntime}
            setNewDowntime={setNewDowntime}
            downtimes={downtimes}
            setDowntimes={setDowntimes}
          />
        </div>
      ) : null}

      <div>
        <Dashboard downtimes={downtimes} setDowntimes={setDowntimes} />
      </div>
    </div>
  );
}

export default App;
