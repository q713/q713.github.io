import {Component} from "react";
import {GameComp} from "./GameComp";

export class Projects extends Component<{}, {}> {
    render() {
        return <div>
            <h2>Projects!!</h2>
            <GameComp/>
        </div>;
    }
}