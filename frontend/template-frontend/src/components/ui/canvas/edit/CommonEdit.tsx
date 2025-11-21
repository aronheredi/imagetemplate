import type { Canvas, FabricObject } from 'fabric'
import { useState } from 'react';
import { EditField } from '../EditField';

export const CommonEdit = ({ selectedObject, canvas }: { selectedObject: FabricObject | null, canvas: Canvas | null }) => {
    const [name, setName] = useState('');

    if (!canvas || !selectedObject) return;
    const update = (key: string, value: string | number) => {
        selectedObject.set(key, value);
        canvas.renderAll();


    }
    return (
        <div className="flex flex-col">
            <div >
                <EditField fields={
                    [{
                        label: 'Name', input: <input type="text" className="border border-black rounded-lg" value={selectedObject.name} onChange={(e) => { update('name', e.target.value); setName(e.target.value); }} />
                    }
                    ]
                } />
            </div>
        </div>
    )
}