import type { Canvas, FabricObject } from 'fabric'
import { useState } from 'react';
import { EditField } from '../EditField';
import Input from '@/components/common/Input';
import CommonStyle from './CommonStyle';
import type { EditProps } from '@/types/canvas';
import Break from '@/components/common/Break';


export const CommonEdit = ({ update, selectedObject }: EditProps) => {
    const [name, setName] = useState('');
    const [width, setWidth] = useState(selectedObject.width || 0);
    const [height, setHeight] = useState(selectedObject.height || 0);
    const [posX, setPosX] = useState(selectedObject.left || 0);
    const [posY, setPosY] = useState(selectedObject.top || 0);
    const [rotation, setRotation] = useState(selectedObject.angle || 0);
    if (!update || !selectedObject) return;

    return (
        <div className='flex flex-col '>
            <div className="flex flex-col">
                <div className="flex flex-col gap-2">
                    <h4 className="text-xs font-medium text-slate-500 uppercase tracking-wider ">Data Binding</h4>
                    <EditField fields={
                        [{
                            label: 'Name', input: <Input type="text" className="border rounded-lg h-8 p-2 font-mono text-blue-600 bg-blue-50/50 border-blue-200 focus:border-blue-400 focus:ring-blue-200" value={selectedObject.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { update('name', e.target.value); setName(e.target.value); }} />
                        }
                        ]
                    } />
                </div>
            </div>
            <Break />
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
                    <EditField fields={[
                        { label: 'Scale X', input: <Input type='number' value={selectedObject.scaleX || 1} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { update('scaleX', Number.parseFloat(e.target.value)); }} /> },
                        { label: 'Scale Y', input: <Input type='number' value={selectedObject.scaleY || 1} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { update('scaleY', Number.parseFloat(e.target.value)); }} /> }
                    ]} />
                </div>
                <div className='flex flex-col gap-3'>
                    <CommonStyle propUpdate={update} selectedObject={selectedObject} />
                </div>
            </div>
        </div>
    )
}