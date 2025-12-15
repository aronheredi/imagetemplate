import { useEffect, useRef } from 'react';
import { Canvas } from 'fabric';
import { useEditorStore } from '@/stores/editor-store';

const DEFAULT_WIDTH = 1920;
const DEFAULT_HEIGHT = 1080;

export default function FabricEditor({
  setCanvas,
  isSpacePressed,
  isPanning,
}: {
  setCanvas: (canvas: Canvas | null) => void;
  isSpacePressed: boolean;
  isPanning: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fabricRef = useRef<Canvas | null>(null);

  const setActiveObjectId = useEditorStore((state) => state.setActiveObjectId);

  // Update cursor and selection state based on props
  useEffect(() => {
    const canvas = fabricRef.current;
    if (!canvas) return;

    if (isPanning) {
        canvas.defaultCursor = 'grabbing';
        canvas.hoverCursor = 'grabbing';
        canvas.selection = false;
    } else if (isSpacePressed) {
        canvas.defaultCursor = 'grab';
        canvas.hoverCursor = 'grab';
        canvas.selection = false;
    } else {
        canvas.defaultCursor = 'default';
        canvas.hoverCursor = 'move';
        canvas.selection = true;
    }
    
    // Force render to apply cursor changes immediately if needed
    canvas.requestRenderAll();
  }, [isPanning, isSpacePressed]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new Canvas(canvasRef.current, {
      backgroundColor: '#ffffff',
      selection: true,
    });

    // IMPORTANT: ensure Fabric updates both the backing store and the element size
    canvas.setDimensions({ width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT }, { cssOnly: false });

    setCanvas(canvas);
    fabricRef.current = canvas;

    const onSelection = (e: { selected?: unknown[] }) => {
      const obj = e.selected?.[0] as { id?: string } | undefined;
      setActiveObjectId(obj?.id ?? null);
    };

    canvas.on('selection:created', onSelection);
    canvas.on('selection:updated', onSelection);

    canvas.on('selection:cleared', () => {
      setActiveObjectId(null);
    });

    canvas.requestRenderAll();

    return () => {
      canvas.dispose();
    };
  }, [setCanvas, setActiveObjectId]);

  return (
    // container controls visible size; overflow handled by CanvasWorkspace
    <div className="flex flex-col gap-3">
      <div className="inline-block rounded-lg bg-white shadow-sm ring-1 ring-slate-900/20">
        <canvas ref={canvasRef} className="block" />
      </div>
    </div>
  );
}
