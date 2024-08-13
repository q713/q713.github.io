import { Heading } from "./Heading";
// import MdFileOpen from "react-icons/md";
import { FaBeer } from "react-icons/fa";
import { MdFileOpen } from "react-icons/md";
import { IconContext } from "react-icons";

interface Publication {
    title: string;
    authors: Array<string>;
    filename: string;
}

const publications: Array<Publication> = [
    {
        title: "Columbo: Low-Level End-to-End System-Traces through Modular Full System Simulation",
        authors: ["Jakob Görgen", "Vaastav Anand", "Hejing Li", "Jialin Li", "Antoine Kaufmann"],
        filename: "columbo-vision-paper.pdf",
    },
    {
        title: "Low-Level End-to-End System-Traces through Modular Full System Simulation",
        authors: ["Jakob Görgen"],
        filename: "columbo-thesis.pdf",
    }
];

export const Publications = () => {

    const publicationItems: Array<JSX.Element> = publications.map(publication => {
        return (<li key={publication.filename}>
            <div className="flex flex-row gap-4 flex-wrap">
                <div className="flex flex-col gap-2 items-start ">
                    <b>
                        <p>{publication.title}</p>
                    </b>
                    <p className="text-sm">{publication.authors.join(", ")}</p>
                </div>
                <a href={require("../documents/" + publication.filename)}>
                    <MdFileOpen size={40} />
                </a>
            </div>
        </li>);
    });

    return (<article className="flex flex-col py-10 pb-20 items-start space-y-10">
        <Heading> Publications </Heading>
        <ul className="flex flex-col gap-8"> {publicationItems} </ul>
    </article>);
}