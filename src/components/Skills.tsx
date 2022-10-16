import cpp from "../images/ISO_C++_Logo.svg";
import java from "../images/Java-Logo.png";
import c from "../images/The_C_Programming_Language_logo.svg.png";
import php from "../images/PHP-logo.png";
import spring from "../images/Spring_Framework_Logo_2018.svg";
import ts from "../images/TypeScript_Logo.svg";
import react from "../images/React-icon.svg";
import camunda from "../images/Camunda_Logo_Black.png";
import kotlin from "../images/Kotlin_Icon_2021.svg";

export const Skills = (): JSX.Element => {
    return <div className="flex py-20 flex-col items-start">
        <h1 className="text-4xl text-bold text-stone-900 py-50">Skills</h1>
        <div className="flex grid grid-cols-3 gap-x-4 gap-y-0 items-center pt-20">
            <div className="justify-center items-center flex shadow-md rounded-lg w-full h-full p-10">
                <img className="w-60 h-30" src={java} alt=""/>
            </div>
            <div className="justify-center items-center flex shadow-md rounded-lg w-full h-full p-10">
                <img className="w-60 h-40" src={spring} alt=""/>
            </div>
            <div className="justify-center items-center flex shadow-md rounded-lg w-full h-full p-10">
                <img className="w-60 h-30" src={php} alt=""/>
            </div>
            <div className="justify-center items-center flex shadow-md rounded-lg w-full h-full p-10">
                <img className="w-60 h-30" src={camunda} alt=""/>
            </div>
            <div className="justify-center items-center flex shadow-md rounded-lg w-full h-full p-10">
                <img className="w-60 h-40" src={cpp} alt=""/>
            </div>
            <div className="justify-center items-center flex shadow-md rounded-lg w-full h-full p-10">
                <img className="w-60 h-50" src={c} alt=""/>
            </div>
            <div className="justify-center items-center flex shadow-md rounded-lg w-full h-full p-2">
                <img className="w-30 h-60" src={ts} alt=""/>
            </div>
            <div className="justify-center items-center flex shadow-md rounded-lg w-full h-full p-2">
                <img className="w-60 h-40" src={react} alt=""/>
            </div>
            <div className="justify-center items-center flex shadow-md rounded-lg w-full h-full p-2">
                <img className="w-60 h-40" src={kotlin} alt=""/>
            </div>
        </div>
    </div>
}