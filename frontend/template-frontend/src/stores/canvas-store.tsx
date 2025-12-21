import type { Canvas } from "fabric";
import { create } from "zustand/react";

type CanvasState = {
    canvas: Canvas | null;
    setCanvas: (canvas: Canvas | null) => void;
}
export const useCanvasStore = create<CanvasState>((set, get) => ({
    canvas: null,
    setCanvas: (canvas: Canvas | null) => set({ canvas }),
}));