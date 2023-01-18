import {Navigate, Route, Routes, useLocation} from "react-router-dom";
import {Home} from "./Home";
import {GameComp} from "./2048/GameComp";

export const Routing = (): JSX.Element => {
    let location = useLocation();
    return <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/2048" element={<GameComp humanPlayer={
            location.state === null ? true : (typeof location.state.humanPlayer === 'boolean'
                ? location.state.humanPlayer : true)
        }/>}/>
        <Route path="/SimbricksRepo" element={<Navigate to="https://github.com/simbricks" replace/>}/>
        <Route path="*" element={<Navigate to="/" replace/>}/>
    </Routes>
}