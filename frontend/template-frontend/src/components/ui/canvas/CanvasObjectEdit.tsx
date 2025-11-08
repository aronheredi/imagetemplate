import type { Canvas, FabricObject } from "fabric"
import { CommonEdit } from "./edit/CommonEdit"

export const CanvasObjectEdit = ({ canvas, selectedObject }: { canvas: Canvas | null, selectedObject: FabricObject | null }) => {

    return (
        <div className="flex flex-col gap-3" >
            <h3 className="text-lg font-semibold text-gray-800" > Edit </h3>
            <CommonEdit selectedObject={selectedObject} canvas={canvas} />
        </div>
    )
}