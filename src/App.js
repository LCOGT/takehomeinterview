import logo from './logo.svg';
import './App.css';
import Downtimes from './database/Downtimes'
import {TableView} from './components/views/TableView'
function App() {
  const downtimes = new Downtimes();
  return (
    <div className="App">
      <TableView context={downtimes} />
    </div>
  );
}

export default App;
