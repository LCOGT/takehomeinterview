import React, { useEffect, useState } from 'react';
import './App.css';
import EntryPoint from './controller/EntryPoint'
import {TableView} from './view/views/TableView'
import { parseData, serializeData } from './Utils';

function App() {
  let entryPoint = new EntryPoint(); // parseData();
  const [prevCounter, setPrevCounter] = new useState(entryPoint.counter);
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (entryPoint.counter != prevCounter) {
        // Having trouble dealing with deeply structured types, so localStore persistence has been
        // commented out for now.
        // setPrevCounter(entryPoint.counter);
        // serializeData(entryPoint);
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="App">
      <TableView context={entryPoint} />
    </div>
  );
}

export default App;
