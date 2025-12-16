import type { LucideIcon } from 'lucide-react';

export type CanvasTool = {
    type: 'select' | 'rect' | 'circle' | 'text' | 'debug';
    label: string;
    icon: LucideIcon;
}