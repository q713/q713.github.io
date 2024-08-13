import { NavLink } from "react-router-dom";
import twnetyfourthyeight from "../images/2048.png";
import simbricks from "../images/simbricks-logo.png";
import snail from "../images/snail-example.png"
import columbo from "../images/columbo.png"
import jakob from "../images/jakob.png"
import { Skills } from "./Skills";
import { Publications } from "./Publications"
import { Heading } from "./Heading";

export const Home = () => {
  function redirect(url: string) {
    window.location.href = url;
  }

  return (
    <div className="max-w-4xl mx-auto px-10 flex flex-col divide-y">
      <div className="flex py-10 flex-col pb-20 text-left gap-4 mt-20 mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-2">
          <div className="center">
            <img className="inline-block rounded-full ring-2 ring-white" src={jakob} alt="" />
          </div>

          <div className="text-left">
            <h1 className="text-4xl text-bold text-stone-900">About Me</h1>
            <p>Hi, I'm Jakob, a German software engineer.</p>
            <p>I am currently working as a research engineer at the <a className="font-bold" href="https://www.mpi-sws.org/">Max Planck
              Institute for Software Systems (MPI SWS)</a> in the <a className="font-bold" href="https://os.mpi-sws.org/">Operating Systems Group</a> of
              Antoine Kaufmann under whose supervision I also successfully completed my Master's degree. My Thesis revolved
              around <a className="font-bold" href="https://www.simbricks.io/projects/columbo.html">Columbo</a>, that aims to add library support
              to <a className="font-bold" href="https://www.simbricks.io">SimBricks</a> for creating Low-Level End-to-End System-Traces.</p>
          </div>
        </div>
        <p>I'm generally interested in Operating-, Database- and Distributed-Systems as well as simulation and virtual prototyping.
          I am particularly interested in understanding the behaviour of Distributed-Systems at run time across boundaries of the
          involved components using techniques like Distributed-Tracing.</p>
        <p>Below you can see some of my projects.</p>
        <p>You can find me on <a className="font-bold" href="https://github.com/q713">GitHub</a> or <a className="font-bold" href="https://www.linkedin.com/in/jakob-görgen-69340b2ab">LinkedIn</a>.</p>
      </div>

      <div className="flex py-10 pb-20 flex-col items-start space-y-10">
        <Heading> Projects </Heading>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-2">
          <div onClick={() => redirect("https://www.simbricks.io/projects/columbo.html")} className=" bg-white/20 p-6 rounded-md shadow-md cursor-pointer border-2 border-gray-50 hover:border-black hover:border-2 transition-colors duration-300">
            <h2 className="text-xl font-semibold mb-4">Columbo</h2>
            <p className="text-gray-700 mb-4">Columbo (my Masters-Thesis) is a library allowing to create Low-Level End-to-End System-Traces through SimBricks Simulations.</p>
            <div className="flex flex-col justify-center items-center mb-4">
              <img className="object-cover w-32 h-42 rounded-t-lg md:rounded-none md:rounded-l-lg"
                src={columbo} alt="" />
            </div>
          </div>
          <div onClick={() => redirect("https://www.simbricks.io/")} className=" bg-white/20 p-6 rounded-md shadow-md cursor-pointer border-2 border-gray-50 hover:border-black hover:border-2 transition-colors duration-300">
            <h2 className="text-xl font-semibold mb-4">SimBricks</h2>
            <p className="text-gray-700 mb-10">SimBricks is a modular full-system end-to-end simulation framework.</p>
            <div className="flex flex-col justify-center items-center">
              <img className="object-cover w-40 h-40 rounded-t-lg md:rounded-none md:rounded-l-lg"
                src={simbricks} alt="" />
            </div>
          </div>
          <div onClick={() => redirect("https://github.com/q713/snail")} className=" bg-white/20 p-6 rounded-md shadow-md cursor-pointer border-2 border-gray-50 hover:border-black hover:border-2 transition-colors duration-300">
            <h2 className="text-xl font-semibold mb-4">Snail</h2>
            <p className="text-gray-700 mb-11">A little snake like game written in Go that can be run in the Terminal.</p>
            <div className="flex flex-col justify-center items-center">
              <img className="object-cover w-40 h-40 rounded-t-lg md:rounded-none md:rounded-l-lg"
                src={snail} alt="" />
            </div>
          </div>
          <NavLink to="2048" state={{ humanPlayer: true }} className=" bg-white/20 p-6 rounded-md shadow-md cursor-pointer border-2 border-gray-50 hover:border-black hover:border-2 transition-colors duration-300">
            <h2 className="text-xl font-semibold mb-4">2048</h2>
            <p className="text-gray-700 mb-4">Here you will find my own implementation of 2048.
              You can either play yourself or watch an AI playing. (Not optimized for mobile devices)</p>
            <div className="flex flex-col justify-center items-center">
              <img className="object-cover w-44 h-44 rounded-t-lg md:rounded-none md:rounded-l-lg"
                src={twnetyfourthyeight} alt="" />
            </div>
          </NavLink>
        </div>
      </div>

      <Publications />

      <Skills />
    </div>
  )
}