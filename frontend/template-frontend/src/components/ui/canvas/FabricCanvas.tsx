import { useEffect, useRef } from 'react';
import type { FabricObject } from 'fabric';
import { Canvas } from 'fabric';
import { useEditorStore } from '@/stores/editor-store';
import { useLayersStore } from '@/stores/layers-store';

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

  const syncFromCanvas = useLayersStore((state) => state.syncFromCanvas);
  const layerOrder = useLayersStore((state) => state.order);



  const setActiveObjectId = useEditorStore((state) => state.setActiveObjectId);

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

    canvas.requestRenderAll();
  }, [isPanning, isSpacePressed]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new Canvas(canvasRef.current, {
      backgroundColor: '#ffffff',
      selection: true,
    });

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


    const sync = () => {
      const objs = canvas.getObjects() as Array<{ id?: string; name?: string; visible?: boolean; type?: string }>;

      const layers = objs.filter((o) => Boolean(o.id))
        .map((o) => ({
          id: String(o.id),
          name: o.name,
          visible: o.visible,
          type: o.type,
        }));
      syncFromCanvas(layers);
    }
    canvas.on('object:added', sync);
    canvas.on('object:removed', sync);
    canvas.on('object:modified', sync);


    canvas.requestRenderAll();

    return () => {
      canvas.off('object:added', sync);
      canvas.off('object:removed', sync);
      canvas.off('object:modified', sync);
      canvas.dispose();
    };
  }, [setCanvas, setActiveObjectId, syncFromCanvas]);

  useEffect(() => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    if (layerOrder.length === 0) return;

    const objects = canvas.getObjects() as Array<{ id?: string }>;
    const byId = new Map<string, unknown>();

    for (const obj of objects) {
      if (obj.id) {
        byId.set(obj.id, obj);
      }
    }
    layerOrder.forEach((id, index) => {
      const obj = byId.get(id) as FabricObject | undefined;
      if (!obj) return;
      canvas.moveObjectTo(obj, index);
    });

    canvas.requestRenderAll();

  }, [layerOrder]);

  return (
    <div className="flex flex-col gap-3">
      <div className="inline-block rounded-lg bg-white shadow-sm ring-1 ring-slate-900/20">
        <canvas ref={canvasRef} className="block" />
      </div>
    </div>
  );
}
