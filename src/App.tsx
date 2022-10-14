import './App.css';
import {Header} from "./components/Header";
import {BrowserRouter} from "react-router-dom";
import {Routing} from "./components/Routing";

function App() {

    return (
        <div className="App">
            <BrowserRouter>
                <Header/>
                <Routing/>
            </BrowserRouter>
        </div>
    );
}

export default App;
