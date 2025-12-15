import { CanvasObjectEdit } from '@/components/ui/canvas/CanvasObjectEdit';
import { CanvasTools } from '@/components/ui/canvas/CanvasTools';
import CanvasWorkspace from '@/components/ui/canvas/CanvasWorkspace';
import type { Canvas } from 'fabric';
import { useState } from 'react';

export const CanvasPage = () => {
  const [canvas, setCanvas] = useState<Canvas | null>(null);

  return (
    <div className="flex min-h-screen flex-row items-center justify-center bg-gray-900 text-gray-800 overflow-hidden">
      <div className="fixed flex h-screen w-screen gap-5 bg-white shadow-lg overflow-hidden">
        <CanvasTools canvas={canvas} />
        <CanvasWorkspace setCanvas={setCanvas} canvas={canvas} />
        <CanvasObjectEdit canvas={canvas} />
      </div>
    </div>
  );
};