import type { FabricObject } from 'fabric';
import type { LucideIcon } from 'lucide-react';

export type CanvasTool = {
    type: 'select' | 'rect' | 'circle' | 'text' | 'image' | 'debug';
    label: string;
    icon: LucideIcon;
}

export interface EditProps {
    selectedObject: FabricObject;
    update: (key: string, value: string | number) => void;
}