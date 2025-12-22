import ColorPicker from '@/components/common/ColorPicker';
import StringToColor from '@/utils/color-transform';
import type { Canvas, FabricObject } from 'fabric';
import type { RGBColor } from 'react-color';
import { EditField } from '../EditField';
interface CommonStyleProps {
    propUpdate: (key: string, value: string | number) => void;
    selectedObject: FabricObject;
}

export default function CommonStyle({ propUpdate, selectedObject }: CommonStyleProps) {
    if (!propUpdate || !selectedObject.fill) return null;
    return (<div className="flex flex-col gap-3">
        <h4 className="text-xs font-medium text-slate-500 uppercase tracking-wider ">Style</h4>

        <ColorPicker initialColor={StringToColor(selectedObject.fill as string)} onChange={(color) => propUpdate('fill', `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a ?? 1})`)} />
        <EditField fields={
            [{
                label: 'Opacity', input: <input type='number' min={0} max={1} step={0.01} value={selectedObject.opacity || 1} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { propUpdate('opacity', Number.parseFloat(e.target.value)); }} className='border rounded-lg h-8 p-2 w-full' />
            }]
        } />
    </div>)
}