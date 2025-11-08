import type { Canvas, FabricObject } from "fabric"

export const CommonEdit = ({ selectedObject, canvas }: { selectedObject: FabricObject | null, canvas: Canvas | null }) => {
    if (!canvas || !selectedObject) return;
    const update = (key: string, value: string | number) => {
        selectedObject.set(key, value);
        canvas.renderAll();

    }
    return (
        <div className="flex flex-col">
            <div >
                <h3 className="text-lg text-gray-800">
                    Name
                </h3>
                <input type="text" className="border border-black rounded-lg" value={selectedObject.name} onChange={(e) => update('name', e.target.value)} />
            </div>
        </div>
    )
}