// import logo from './logo.svg';
import './App.css';
import TableDisplay from "./components/table/tableDisplay";
import DowntimeForm from "./components/table/DowntimeForm";

function App() {
    return (
        <div className="hero">
            <div className="flex justify-center items-center min-h-screen">
                <div className="hero-content p-3">
                    <div className="card shadow-2xl">
                        <TableDisplay/>
                        <DowntimeForm/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
