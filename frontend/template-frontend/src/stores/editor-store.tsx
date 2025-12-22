import { create } from 'zustand';

export type ToolType = 'select' | 'rect' | 'circle' | 'text' | 'image' | 'debug';
type EditorStore = {
    activeTool: ToolType;
    activeObjectId: string | null;
    setActiveTool: (tool: ToolType) => void;
    setActiveObjectId: (id: string | null) => void;
};
export const useEditorStore = create<EditorStore>((set) => ({
    activeTool: 'select',
    activeObjectId: null,

    setActiveTool: (tool: ToolType) => set({ activeTool: tool }),

    setActiveObjectId: (id: string | null) => set({ activeObjectId: id }),
}));

