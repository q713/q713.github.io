import { Heading } from "./Heading";

import cpp from "../images/ISO_C++_Logo.svg";
import java from "../images/Java-Logo.png";
import c from "../images/The_C_Programming_Language_logo.svg.png";
import php from "../images/PHP-logo.png";
import spring from "../images/Spring_Framework_Logo_2018.svg";
import ts from "../images/TypeScript_Logo.svg";
import react from "../images/React-icon.svg";
import camunda from "../images/Camunda_Logo_Black.png";
import golang from "../images/Go-Logo_Blue.svg"

export const Skills = (): JSX.Element => {
    return  <div className="flex py-10 flex-col pb-20 text-left gap-4">
        <Heading>Skills</Heading>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-2">
                <div className="flex justify-center items-center bg-white/20 p-6 rounded-md shadow-md cursor-pointer border-2 border-gray-50">
                    <img className="w-60 h-30" src={java} alt=""/>
                </div>
                <div className="flex justify-center items-center bg-white/20 p-6 rounded-md shadow-md cursor-pointer border-2 border-gray-50">
                    <img className="w-60 h-40" src={spring} alt=""/>
                </div>
                <div className="flex justify-center items-center bg-white/20 p-6 rounded-md shadow-md cursor-pointer border-2 border-gray-50">
                    <img className="w-60 h-30" src={php} alt=""/> 
                </div>
                <div className="flex justify-center items-center bg-white/20 p-6 rounded-md shadow-md cursor-pointer border-2 border-gray-50">
                    <img className="w-60 h-30" src={camunda} alt=""/>  
                </div>
                <div className="flex justify-center items-center bg-white/20 p-6 rounded-md shadow-md cursor-pointer border-2 border-gray-50">
                    <img className="w-40 h-40" src={cpp} alt=""/>
                </div>
                <div className="flex justify-center items-center bg-white/20 p-6 rounded-md shadow-md cursor-pointer border-2 border-gray-50">
                    <img className="w-60 h-50" src={c} alt=""/>
                </div>
                <div className="flex justify-center items-center bg-white/20 p-6 rounded-md shadow-md cursor-pointer border-2 border-gray-50">
                    <img className="w-30 h-60" src={ts} alt=""/>  
                </div>
                <div className="flex justify-center items-center bg-white/20 p-6 rounded-md shadow-md cursor-pointer border-2 border-gray-50">
                    <img className="w-60 h-40" src={react} alt=""/>  
                </div>
                <div className="flex justify-center items-center bg-white/20 p-6 rounded-md shadow-md cursor-pointer border-2 border-gray-50">
                    <img className="w-60 h-40" src={golang} alt=""/>  
                </div>
            </div>
        </div>;
}