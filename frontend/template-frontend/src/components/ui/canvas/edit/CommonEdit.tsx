import type { Canvas, FabricObject } from 'fabric'
import { useState } from 'react';
import { EditField } from '../EditField';
import Input from '@/components/common/Input';

interface CommonEditProps {
    update: (key: string, value: string | number) => void;
    selectedObject: FabricObject | null;
}
export const CommonEdit = ({ update, selectedObject }: CommonEditProps) => {
    const [name, setName] = useState('');

    if (!update || !selectedObject) return;

    return (
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
    )
}