import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';
import { QueryBuilderButton } from './QueryBuilderButton';
import { Button, TextField } from '@radix-ui/themes/components/index';
import type { Canvas } from 'fabric';
import type { QueryProperty } from '@/types/query';
import { Plus, ChevronDown } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { fabricQuerySchema } from '@/schemas/query-schema';
interface QueryBuilderPopupProps {
    canvas: Canvas
}
export const QueryBuilderPopup = ({ canvas }: QueryBuilderPopupProps) => {
    const [open, setOpen] = useState(false);
    const [json, setJson] = useState('');
    const onSubmit = (data) => {
        console.log("Form submitted with data:", data);
        setOpen(false);
    }
    const [values, setValues] = useState<Record<string, QueryProperty[]>>({});
    useEffect(() => {
        //leave out unneccessary fields for the backend
        setJson(JSON.stringify(values, (key, value) => {
            if (key === 'label' || key === 'type') return undefined;
            return value;
        }, 2));
    }, [values]);
    useEffect(() => {
        if (!open) return;

        setValues(prev => {
            const next = { ...prev };
            canvas.getObjects().forEach((obj) => {
                const objName = obj.name;
                if (objName && !next[objName]) {
                    next[objName] = [];
                }
            });
            return next;
        });
    }, [canvas, open, json]);
    const addProperty = (objName: string, property: QueryProperty) => {
        setValues(prev => ({
            ...prev,
            [objName]: [...(prev[objName] || []), property]
        }));
    };

    const removeProperty = (objName: string, propertyKey: string) => {
        setValues(prev => ({
            ...prev,
            [objName]: (prev[objName] || []).filter(p => p.key !== propertyKey)
        }));
    };
    const setPropertyValue = (objName: string, propertyKey: string, value: string) => {
        setValues(prev => ({
            ...prev,
            [objName]: (prev[objName] || []).map(p => p.key === propertyKey ? { ...p, value } : p)
        }));
    }
    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
                <QueryBuilderButton />
            </Dialog.Trigger>
            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
            <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[55vw] max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg outline-none">
                <Dialog.Title className="text-lg font-medium text-slate-900">Query Builder</Dialog.Title>
                <div className='grid grid-cols-2 gap-2'>
                    <form onSubmit={onSubmit} className="space-y-4 flex flex-col gap-2 overflow-auto p-4">

                        <h3 className="font-semibold text-sm text-slate-900 mb-4">Elements</h3>
                        <div className='flex flex-col gap-4 overflow-scroll max-h-[40vh]'>
                            {canvas.getObjects().map((obj, idx) => (
                                <div key={idx} className='border border-slate-200 bg-slate-50 rounded-lg p-4 w-full flex flex-col gap-2'>
                                    <label className="flex flex-row gap-2 text-sm font-medium text-slate-700 mb-1 " htmlFor="name">{obj.name} <p className='text-slate-300'>({obj.type})</p></label>
                                    {values[obj.name!]?.map((prop, pIdx) => (
                                        <TextField.Root onChange={(e) => setPropertyValue(obj.name!, prop.key, e.target.value)} key={pIdx} placeholder='Prop name' radius='large' size='3' className=' gap-2 border-slate-300 py-4 px-3 shadow-sm focus:border-primary focus:ring-1 focus:ring-primary'>
                                            <TextField.Slot className='font-mono text-slate-600 min-w-[80px] p-1 flex-1 overflow-clip ' >
                                                {prop.key}
                                            </TextField.Slot>
                                        </TextField.Root>
                                    ))}
                                    <DropdownMenu.Root >
                                        <DropdownMenu.Trigger asChild>
                                            <button
                                                type="button"
                                                className='mt-2 w-full flex flex-row items-center justify-start gap-2 px-3 py-2 border border-slate-300 rounded-md bg-white hover:bg-slate-50 transition-colors text-sm'
                                            >
                                                <Plus size={16} />
                                                <span className="flex-1 text-left">Add Property</span>
                                                <ChevronDown size={16} className="ml-auto" />
                                            </button>
                                        </DropdownMenu.Trigger>
                                        <DropdownMenu.Portal >
                                            <DropdownMenu.Content
                                                align="start"
                                                className=" w-full bg-white rounded-md shadow-md border border-slate-200 p-2 w-[var(--radix-popover-trigger-width)]"
                                            >
                                                {fabricQuerySchema[obj.type].filter((prop) => !(values[obj.name!]?.some((p) => p.key === prop.key))).map((prop, propIdx) => {

                                                    return (

                                                        <DropdownMenu.Item key={propIdx} onSelect={(e) => addProperty(obj.name!, { ...prop, value: obj.get(prop.key) })} className="px-3 py-2 rounded-md hover:bg-slate-100 text-sm cursor-pointer">
                                                            {prop.key}
                                                        </DropdownMenu.Item>
                                                    );
                                                })
                                                }
                                            </DropdownMenu.Content>
                                        </DropdownMenu.Portal>
                                    </DropdownMenu.Root>
                                </div>
                            ))}
                        </div>

                        {/* {<div className="flex justify-end gap-2">
                            <Dialog.Close asChild>
                                <button type="button" className="rounded-md border px-3 py-2 text-sm">
                                    Cancel
                                </button>
                            </Dialog.Close>

                            <button
                                type="submit"
                                className="inline-flex items-center justify-center rounded-md bg-slate-900 px-3 py-2 text-sm text-white"
                            >
                                Create Template
                            </button>
                        </div>} */}
                    </form>
                    <div className='flex flex-col space-y-4 p-4'>
                        <h3 className="font-semibold text-sm text-slate-900 mb-4">JSON Query</h3>
                        <div className='border border-slate-200 bg-slate-50 rounded-lg p-4 w-full  gap-2 max-h-[40vh] overflow-scroll'>
                            <p className='whitespace-pre-wrap font-mono text-xs text-slate-700 break-words'>
                                {json}
                            </p>
                        </div>
                    </div>
                </div>

            </Dialog.Content>
        </Dialog.Root >
    );
}