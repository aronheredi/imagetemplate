
import { CanvasObjectEdit } from '@/components/ui/canvas/CanvasObjectEdit';
import { CanvasTools } from '@/components/ui/canvas/CanvasTools';
import FabricCanvas from '@/components/ui/canvas/FabricCanvas';
import type { CanvasTool } from '@/types/canvas';
import { Circle, Rect, Textbox, type Canvas, type FabricObject } from 'fabric';
import { useState } from 'react';

export const CanvasPage = () => {
  const [activeObject, setActiveObject] = useState<FabricObject | null>(null);
  const [canvas, setCanvas] = useState<Canvas | null>(null);



  return (
    <div className="flex min-h-screen flex-row items-center justify-center bg-gray-900 p-8 text-gray-800">
      <div className="flex gap-5 rounded-lg bg-white p-6 shadow-lg">
        <CanvasTools canvas={canvas} />
        <FabricCanvas setCanvas={setCanvas} setActiveObject={setActiveObject} />
        <CanvasObjectEdit canvas={canvas} selectedObject={activeObject} />
      </div>
    </div>
  );
};