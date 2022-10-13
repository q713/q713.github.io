import './App.css';
import {GameComp} from './components/GameComp';
import {Header} from "./components/Header";
import {Navigate, Route, Routes, useLocation} from "react-router-dom";
import {Home} from "./components/Home";

function App() {
    let location = useLocation();
    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/2048" element={<GameComp humanPlayer={
                    location.state === null ? true : (typeof location.state.humanPlayer === 'boolean'
                        ? location.state.humanPlayer : true)
                }/>}/>
                <Route path="*" element={<Navigate to="/" replace/>}/>
            </Routes>
        </div>
    );
}

export default App;
