import { PropsWithChildren } from "react";

type HeadingProps = {
}


export const Heading = (props: PropsWithChildren<HeadingProps>) => {
    return (
        <h1 className="text-4xl text-bold text-stone-900 pt-10 pb-10"> {props.children} </h1>
    );
};