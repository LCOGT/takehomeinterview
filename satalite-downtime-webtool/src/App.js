import "./App.css";
import Home from "./Components/Pages/Home";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="App">
        <header className="App-header">
          <Home />
        </header>
      </div>
    </LocalizationProvider>
  );
}

export default App;
