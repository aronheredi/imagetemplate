
import { CanvasObjectEdit } from '@/components/ui/canvas/CanvasObjectEdit';
import { CanvasTools } from '@/components/ui/canvas/CanvasTools';
import CanvasWorkspace from '@/components/ui/canvas/CanvasWorkspace';
import { JsonPanel } from '@/components/ui/canvas/json/JsonPanel';
import LayersPanel from '@/components/ui/canvas/layers/LayersPanel';
import { useCanvasStore } from '@/stores/canvas-store';
import { useEditorStore } from '@/stores/editor-store';
import type { Canvas } from 'fabric';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


export const CanvasPage = () => {
  const id = useParams().id as string;
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const setGlobalCanvas = useCanvasStore((state) => state.setCanvas);
  const isJsonPanelOpen = useEditorStore((state) => state.jsonPanelOpen);

  useEffect(() => {
    if (canvas) {
      setGlobalCanvas(canvas);
    }
    return () => {
      setGlobalCanvas(null);
    }
  }, [canvas, setGlobalCanvas]);

  return (
    <div className="flex min-h-screen flex-row items-center justify-center bg-gray-900 text-gray-800 overflow-hidden">
      <div className="fixed flex h-screen w-screen  bg-white shadow-lg overflow-hidden">
        <CanvasTools canvas={canvas} />
        <CanvasWorkspace setCanvas={setCanvas} canvas={canvas} templateId={id} />
        <div className='flex  flex-col '>
          <CanvasObjectEdit canvas={canvas} />
          <LayersPanel canvas={canvas} />

        </div>
        {isJsonPanelOpen && <JsonPanel text={JSON.stringify(canvas?.toJSON(), null, 2) || ''} />}
      </div>
    </div>
  );
};