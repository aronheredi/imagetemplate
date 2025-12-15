import ColorPicker from "@/components/common/ColorPicker";
import StringToColor from "@/utils/color-transform";
import type { Canvas, FabricObject } from "fabric";
import type { RGBColor } from "react-color";
interface CommonStyleProps {
    propUpdate: (key: string, value: string | number) => void;
    selectedObject: FabricObject;
}

export default function CommonStyle({ propUpdate, selectedObject }: CommonStyleProps) {
    if (!propUpdate || !selectedObject.fill) return null;
    return (<div className="flex flex-col gap-3">
        <h4 className="text-xs font-medium text-slate-500 uppercase tracking-wider ">Style</h4>

        <ColorPicker initialColor={StringToColor(selectedObject.fill as string)} onChange={(color) => propUpdate('fill', `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a ?? 1})`)} />
    </div>)
}