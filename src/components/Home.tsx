import { NavLink } from "react-router-dom";
import twnetyfourthyeight from "../images/2048.png";
import simbricks from "../images/simbricks-logo.png";
import { ProjectCard } from "./ProjectCard";
import { Skills } from "./Skills";

export const Home = () => {
    return (
        <div className="max-w-4xl mx-auto px-10 flex flex-col divide-y">
            <div className="flex py-10 flex-col items-start gap-4 pb-20">
                <h1 className="text-4xl text-bold text-stone-900 py-10 mt-20">About Me</h1>

                <p>Hello I'm Jakob. Im a german computer science and working student.</p>
                <p>Currently I'm working on my masters thesis at the <a className="font-bold" href="https://www.uni-saarland.de/start.html">Universität des Saarlandes</a> were I'm advised by</p>
                <p><a className="font-bold" href="https://people.mpi-sws.org/~antoinek/index.html">Antoine Kaufmann</a>.</p>
                <p>Besides studying I'm a working student at <a className="font-bold" href="https://www.consistec.de/">Consistec Gmbh</a> in the sofwtare development department.</p>

                <p className="mt-10">Below you can see some of my projects.</p>

                <p>More projects and those that I made for example at the university you can find on my <a className="font-bold" href="https://github.com/q713">GitHub</a> account.</p>
            </div>

            <div className="flex py-10 pb-20 flex-col items-start space-y-10">
                <h1 className="text-4xl text-bold text-stone-900 pt-10 pb-10">Projects</h1>
                <ProjectCard>
                    <img className="object-cover w-48 h-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
                        src={twnetyfourthyeight} alt="" />
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
                                <NavLink to="2048" state={{ humanPlayer: true }} className="text-xs font-bold uppercase
                                        rounded-lg bg-white border-stone-900 border-2 text-stone-900 ml-auto px-5 py-2.5
                                        mr-4 hover:bg-stone-100">
                                    Play by yourself
                                </NavLink>
                                <NavLink to="2048" state={{ humanPlayer: false }} className="text-xs font-bold uppercase
                                        rounded-lg bg-stone-900 text-white ml-auto px-5 py-2.5 hover:bg-stone-800">
                                    Watch the AI play!
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </ProjectCard>

                <ProjectCard>
                    <img className="object-cover w-48 h-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
                        src={simbricks} alt="" />
                    <div className="flex flex-col justify-between leading-normal">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Simbricks
                        </h5>
                        <div className="mt-2">
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                Simbricks is a modular full-system end-to-end simulation framework.
                                Within the context of SimBricks im currently writing my masters thesis.
                            </p>
                            <div className="flex-row mt-6 justify-center">
                                <div className="text-xs font-bold uppercase
                                        rounded-lg bg-white border-stone-900 border-2 text-stone-900 px-5 py-2.5
                                        mr-20 ml-20 hover:bg-stone-100">
                                    <a href="https://github.com/simbricks">GitHub Repository</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </ProjectCard>
            </div>

            <Skills />
        </div>
    )
}