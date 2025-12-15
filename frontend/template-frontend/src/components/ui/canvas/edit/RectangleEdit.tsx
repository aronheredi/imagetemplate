import type { Canvas, FabricObject } from 'fabric';
import { useEffect, useReducer, useState, type FunctionComponent } from 'react';
import { EditField } from '../EditField';
import Input from '@/components/common/Input';
import CommonStyle from './CommonStyle';

interface RectangleEditProps {
    selectedObject: FabricObject;
    update: (key: string, value: string | number) => void;
}

export default function RectangleEdit({ selectedObject, update }: RectangleEditProps) {

    const [width, setWidth] = useState(selectedObject.width || 0);
    const [height, setHeight] = useState(selectedObject.height || 0);
    const [posX, setPosX] = useState(selectedObject.left || 0);
    const [posY, setPosY] = useState(selectedObject.top || 0);
    const [rotation, setRotation] = useState(selectedObject.angle || 0);

    if (!update || !selectedObject) return;


    return (
        <div className='flex flex-col gap-3'>
            <div className='flex flex-col gap-3'>
                <h4 className="text-xs font-medium text-slate-500 uppercase tracking-wider ">Layout</h4>
                <EditField fields={[
                    {
                        label: 'Width', input: <Input type='number' value={selectedObject.width || 0} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { update('width', Number.parseInt(e.target.value)); setWidth(Number.parseInt(e.target.value)); }} />
                    },
                    {
                        label: 'Height', input: <Input type='number' value={selectedObject.height || 0} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { update('height', Number.parseInt(e.target.value)); setHeight(Number.parseInt(e.target.value)); }} />
                    }
                ]} />
                <EditField fields={[
                    {
                        label: 'X Position', input: <Input type='number' value={selectedObject.left || 0} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { update('left', Number.parseInt(e.target.value)); setPosX(Number.parseInt(e.target.value)); }} />
                    },
                    {
                        label: 'Y Position', input: <Input type='number' value={selectedObject.top || 0} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { update('top', Number.parseInt(e.target.value)); setPosY(Number.parseInt(e.target.value)); }} />
                    }]} />
                <EditField fields={[
                    {
                        label: 'Rotation', input: <Input type='number' value={selectedObject.angle || 0} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { update('angle', Number.parseInt(e.target.value)); setRotation(Number.parseInt(e.target.value)); }} />
                    }
                ]} />
            </div>
            <div className='flex flex-col gap-3'>
                <CommonStyle propUpdate={update} selectedObject={selectedObject} />
            </div>
        </div>);
}

