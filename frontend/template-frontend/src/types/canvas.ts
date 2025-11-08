export type CanvasTool = {
    type: 'select' | 'rect' | 'circle' | 'text' | 'debug';
    label: string;
    icon: string;
}