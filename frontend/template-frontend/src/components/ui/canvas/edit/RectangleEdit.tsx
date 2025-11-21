import type { Canvas, FabricObject } from 'fabric';
import { useEffect, useReducer, useState, type FunctionComponent } from 'react';
import { EditField } from '../EditField';

interface RectangleEditProps {
    selectedObject: FabricObject;
    canvas: Canvas
}

const RectangleEdit: FunctionComponent<RectangleEditProps> = ({ selectedObject, canvas }) => {

    const [width, setWidth] = useState(selectedObject.width || 0);
    const [height, setHeight] = useState(selectedObject.height || 0);
    const [posX, setPosX] = useState(selectedObject.left || 0);
    const [posY, setPosY] = useState(selectedObject.top || 0);
    const [rotation, setRotation] = useState(selectedObject.angle || 0);
    const [, forceUpdate] = useReducer((x) => x + 1, 0);

    useEffect(() => {
        if (!canvas) return;
        const handleUpdate = () => forceUpdate();
        canvas.on('object:modified', handleUpdate);
        canvas.on('object:moving', handleUpdate);
        canvas.on('object:scaling', handleUpdate);
        canvas.on('object:rotating', handleUpdate);
        canvas.on('object:resizing', handleUpdate);
        return () => {
            canvas.off('object:modified', handleUpdate);
            canvas.off('object:moving', handleUpdate);
            canvas.off('object:scaling', handleUpdate);
            canvas.off('object:rotating', handleUpdate);
            canvas.off('object:resizing', handleUpdate);

        }
    }, [canvas]);
    if (!canvas || !selectedObject) return;
    const update = (key: string, value: string | number) => {
        selectedObject.set(key, value);
        canvas.renderAll();


    }

    return (
        <div>
            <EditField fields={[
                {
                    label: 'Width', input: <input type='number' className="border border-black rounded-lg w-32" value={selectedObject.width || 0} onChange={(e) => { update('width', Number.parseInt(e.target.value)); setWidth(Number.parseInt(e.target.value)); }} />
                },
                {
                    label: 'Height', input: <input type='number' className="border border-black rounded-lg w-32" value={selectedObject.height || 0} onChange={(e) => { update('height', Number.parseInt(e.target.value)); setHeight(Number.parseInt(e.target.value)); }} />
                }
            ]} />
            <EditField fields={[
                {
                    label: 'Position X', input: <input type='number' className="border border-black rounded-lg w-32" value={selectedObject.left || 0} onChange={(e) => { update('left', Number.parseInt(e.target.value)); setPosX(Number.parseInt(e.target.value)); }} />
                },
                {
                    label: 'Position Y', input: <input type='number' className="border border-black rounded-lg w-32" value={selectedObject.top || 0} onChange={(e) => { update('top', Number.parseInt(e.target.value)); setPosY(Number.parseInt(e.target.value)); }} />
                }]} />
            <EditField fields={[
                {
                    label: 'Rotation', input: <input type='number' className="border border-black rounded-lg w-32" value={selectedObject.angle || 0} onChange={(e) => { update('angle', Number.parseInt(e.target.value)); setRotation(Number.parseInt(e.target.value)); }} />
                }
            ]} />
        </div>);
}

export default RectangleEdit;