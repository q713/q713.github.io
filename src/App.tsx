import './App.css';
import {GameComp} from './components/GameComp';
import {Header} from "./components/Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {About} from "./components/About";
import {Projects} from "./components/Projects";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Header/>

            {/* TODO: error component */}
            <Routes>
                <Route path="/"
                       element={<About/>}
                />
                <Route path="projects"
                       element={<Projects/>}
                />
            </Routes>

        </BrowserRouter>
    </div>
  );
}

export default App;
