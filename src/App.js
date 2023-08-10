import logo from './logo.svg';
import './App.css';
import Downtimes from './database/Downtimes'

function App() {
  const downtimes = new Downtimes();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <TableView context={downtimes} />
    </div>
  );
}

export default App;
