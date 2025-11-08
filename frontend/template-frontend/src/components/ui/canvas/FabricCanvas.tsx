import { useEffect, useRef, useState } from 'react';
import type { FabricObject } from 'fabric';
import { Canvas, Rect, Circle, Textbox } from 'fabric';
import type { CanvasTool } from '@/types/canvas';

export default function FabricEditor({ setCanvas, setActiveObject }: { setCanvas: (canvas: Canvas | null) => void, setActiveObject: (obj: FabricObject | null) => void }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fabricRef = useRef<Canvas | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = new Canvas(canvasRef.current, {
      backgroundColor: '#f3f3f3',
      selection: true,
    });
    setCanvas(canvas);
    fabricRef.current = canvas;
    canvas.on('selection:created', (e) => {
      setActiveObject(e.selected?.[0] || null);
    });
    canvas.on('selection:updated', (e) => {
      setActiveObject(e.selected?.[0] || null);
    });
    canvas.on('selection:cleared', () => {
      setActiveObject(null);
    });

    return () => {
      canvas.dispose();
    };
  }, [setCanvas, setActiveObject]);



  return (




    < div className="flex flex-col gap-3" >
      <h3 className="text-lg font-semibold text-gray-800">Canvas</h3>
      <canvas
        ref={canvasRef}
        width={600}
        height={400}
        className="rounded-lg border-2 border-gray-300 shadow-sm"
      />
    </div >

  );
}
