import type { EditProps } from "@/types/canvas";
import { EditField } from "../EditField";
import Input from "@/components/common/Input";
import { FontWeightDropdown } from "./FontWeightDropdown";


export const TextEdit = ({ selectedObject, update }: EditProps) => {
    return (
        <div className='flex flex-col gap-3'>
            <div className='flex flex-col gap-3'>
                <h4 className="text-xs font-medium text-slate-500 uppercase tracking-wider ">Text</h4>
                <EditField fields={[
                    {
                        label: 'Font Size', input: <Input type='number' value={selectedObject.fontSize || 24} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { update('fontSize', Number.parseInt(e.target.value)); }} />
                    },
                    {
                        label: 'Font Weight', input: <FontWeightDropdown selectedObject={selectedObject} update={update} />
                    }
                ]} />

            </div>

        </div>);
}