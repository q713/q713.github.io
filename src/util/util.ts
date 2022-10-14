export function randomMinMax(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function delaySeconds(delay: number) {
    return delayMilliSeconds(1000 * delay);
}

export function delayMilliSeconds(delay: number) {
    return new Promise(resolve => {setTimeout(resolve, delay)});
}