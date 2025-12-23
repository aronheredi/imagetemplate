import { create } from 'zustand';

export type ToolType = 'select' | 'rect' | 'circle' | 'text' | 'image' | 'debug';
type EditorStore = {
    activeTool: ToolType;
    activeObjectId: string | null;
    setActiveTool: (tool: ToolType) => void;
    setActiveObjectId: (id: string | null) => void;
    jsonPanelOpen: boolean;
    setJsonPanelOpen: (isOpen: boolean) => void;
};
export const useEditorStore = create<EditorStore>((set) => ({
    activeTool: 'select',
    activeObjectId: null,
    jsonPanelOpen: false,
    setJsonPanelOpen: (isOpen: boolean) => set({ jsonPanelOpen: isOpen }),
    setActiveTool: (tool: ToolType) => set({ activeTool: tool }),

    setActiveObjectId: (id: string | null) => set({ activeObjectId: id }),
}));

