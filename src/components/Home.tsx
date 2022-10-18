import {Component} from "react";
import {NavLink} from "react-router-dom";
import twnetyfourthyeight from "../images/2048.png";
import {Skills} from "./Skills";

export class Home extends Component<{}, {}> {
    render() {
        return <div className="max-w-4xl mx-auto px-10 flex flex-col divide-y">
            <div className="flex py-10 flex-col items-start gap-4 pb-20">
                <h1 className="text-4xl text-bold text-stone-900 py-10 mt-20">About Me</h1>

                <p>Hello I'm Jakob. Im a german computer science and working student.</p>
                <p>Currently I'm working on my masters thesis at the <a className="font-bold" href="https://www.uni-saarland.de/start.html">Universität des Saarlandes</a>.</p>
                <p>Besides studying I'm a working student at <a className="font-bold" href="https://www.inexio.net/">inexio</a> in thesofwtare development department.</p>

                <p className="mt-10">Below you can see some of my projects that you can try directly in your Browser!</p>
                <p>I made them just for fun in my spare time.</p>
                <p>More projects and those that i made at the university you can find on my TODO account.</p>
            </div>

            <div className="flex py-10 pb-20 flex-col items-start">
                <h1 className="text-4xl text-bold text-stone-900 pt-10 pb-20">Projects</h1>
                <div className="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-4xl p-20">
                    <img className="object-cover w-48 h-48 object-cover rounded-t-lg md:rounded-none md:rounded-l-lg"
                         src={twnetyfourthyeight} alt=""/>
                    <div className="flex flex-col justify-between leading-normal">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            2048
                        </h5>
                        <div className="mt-2">
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                Here you will find my own implementation of 2048. You can either play yourself or let
                                the
                                AI show you what is possible.
                            </p>
                            <div className="flex-row mt-6 justify-end items-end">
                                <NavLink to="2048" state={{humanPlayer: true}} className="text-xs font-bold uppercase
                                        rounded-lg bg-white border-stone-900 border-2 text-stone-900 ml-auto px-5 py-2.5
                                        mr-4 hover:bg-stone-100">
                                    Play by yourself
                                </NavLink>
                                <NavLink to="2048" state={{humanPlayer: false}} className="text-xs font-bold uppercase
                                        rounded-lg bg-stone-900 text-white ml-auto px-5 py-2.5 hover:bg-stone-800">
                                    Watch the AI play!
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Skills/>
        </div>
    }
}