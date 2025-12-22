import type { Canvas, FabricObject } from 'fabric';
import { useEffect, useReducer, useState, type FunctionComponent } from 'react';
import { EditField } from '../EditField';
import Input from '@/components/common/Input';
import CommonStyle from './CommonStyle';
import type { EditProps } from '@/types/canvas';



export default function RectangleEdit({ selectedObject, update }: EditProps) {

    const [width, setWidth] = useState(selectedObject.width || 0);
    const [height, setHeight] = useState(selectedObject.height || 0);
    const [posX, setPosX] = useState(selectedObject.left || 0);
    const [posY, setPosY] = useState(selectedObject.top || 0);
    const [rotation, setRotation] = useState(selectedObject.angle || 0);

    if (!update || !selectedObject) return;


    return (
        <div className='flex flex-col gap-3'>

        </div>);
}

