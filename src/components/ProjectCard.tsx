import React from "react";
import { animated, useSpring } from '@react-spring/web'

export const ProjectCard = (props: { children?: React.ReactNode }): JSX.Element => {
    const [{ x, y }, api] = useSpring(() => ({
        from: { x: 0, y: 0 },
    }))

    const handleMouseEnter = () => {
        api.start(
            {
                from: { x: 0, y: 0 },
                to: { x: 1, y: 1 }
            }
        );
    }

    const shakeXStart = 0;
    const shakeXEnd = 1;
    const xInterpolate = x.to(
        [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
        [shakeXStart, shakeXEnd, shakeXStart, shakeXEnd, shakeXStart, shakeXEnd, shakeXStart, shakeXEnd],
    );

    const shakeYStart = 0;
    const shakeYEnd = 1;
    const yInterpolate = y.to(
        [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
        [shakeYStart, shakeYEnd, shakeYStart, shakeYEnd, shakeYStart, shakeYEnd, shakeYStart, shakeYEnd],
    );

    // return (<animated.div onMouseEnter={handleMouseEnter} style={{ x: xInterpolate, y: yInterpolate }} className="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-4xl p-10">
    //     {props.children}
    // </animated.div>);
    return (<div className="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-4xl p-10">
        {props.children}
    </div>);
}