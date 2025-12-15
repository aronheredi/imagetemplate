import type { RGBColor } from "react-color";



export default function StringToColor(str: string): RGBColor {
    const rgbaObject = (str.match(/\d+(\.\d+)?/g) || [])
        .map(Number);

    const rgba: RGBColor = {
        r: rgbaObject[0],
        g: rgbaObject[1],
        b: rgbaObject[2],
        a: rgbaObject[3],
    };
    return rgba;
}