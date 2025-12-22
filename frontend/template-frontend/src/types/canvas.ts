import type { LucideIcon } from 'lucide-react';

export type CanvasTool = {
    type: 'select' | 'rect' | 'circle' | 'text' | 'image' | 'debug';
    label: string;
    icon: LucideIcon;
}