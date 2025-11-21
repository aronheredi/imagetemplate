import type { Canvas, FabricObject } from "fabric"
import { CommonEdit } from "./edit/CommonEdit"
import { useEffect, useReducer, useState } from "react";
import { EditField } from "./EditField";
import RectangleEdit from "./edit/RectangleEdit";

export const CanvasObjectEdit = ({ canvas, selectedObject }: { canvas: Canvas | null, selectedObject: FabricObject | null }) => {
    const [posX, setPosX] = useState(0);
    const [posY, setPosY] = useState(0);
    const [, forceUpdate] = useReducer((x) => x + 1, 0);

    if (!canvas || !selectedObject) return null;
    return (
        <div className="flex flex-col gap-3" >
            <h3 className="text-lg font-semibold text-gray-800" > Edit </h3>
            <CommonEdit selectedObject={selectedObject} canvas={canvas} />
            {selectedObject.type === 'rect' && (
                <RectangleEdit selectedObject={selectedObject} canvas={canvas} />
            )}
        </div>
    )
}