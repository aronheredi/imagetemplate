import { useEffect, useRef, useState } from 'react';
import { Canvas, Circle, Rect, Textbox } from 'fabric';
import type { CanvasTool } from '@/types/canvas';
 

export default function FabricEditor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fabricRef = useRef<Canvas | null>(null);
  const [activeTool, setActiveTool] = useState<CanvasTool | null>(null);
  const tools: CanvasTool[] = [
    { type: 'select', label: 'Select', icon: 'cursor' },
    { type: 'rect', label: 'Rectangle', icon: 'square' },
    { type: 'circle', label: 'Circle', icon: 'circle' },
    { type: 'text', label: 'Text', icon: 'text' },
  ];
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = new Canvas(canvasRef.current, {
      backgroundColor: '#f3f3f3',
      selection: true,
    });
    fabricRef.current = canvas;

    return () => {
      canvas.dispose();
    };
  }, []);

  // Add element when tool is clicked
  const handleAddElement = (tool: CanvasTool) => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    setActiveTool(tool);
    let obj;

    switch (tool.type) {
      case 'select':
        return;
      case 'rect':
        obj = new Rect({
          left: 100,
          top: 100,
          fill: 'red',
          width: 80,
          height: 60,
        });
        break;

      case 'circle':
        obj = new Circle({
          left: 150,
          top: 150,
          fill: 'blue',
          radius: 40,
        });
        break;

      case 'text':
        obj = new Textbox('Edit me', {
          left: 200,
          top: 200,
          fontSize: 20,
          fill: '#333',
        });
        break;

      default:
        return;
    }

    canvas.add(obj);
    canvas.setActiveObject(obj);
    canvas.renderAll();
  };

  return (
    <div className="flex gap-5 rounded-lg bg-white p-6 shadow-lg">
      {/* Toolbar */}
      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold text-gray-800">Tools</h3>
        {tools.map((tool) => (
          <button
            type="button"
            key={tool.type}
            onClick={() => handleAddElement(tool)}
            className={`rounded-lg border px-3 py-2 text-sm font-medium transition-all duration-200 ${
              activeTool === tool
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50'
            }`}
          >
            {tool.label}
          </button>
        ))}
      </div>

      {/* Canvas */}
      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold text-gray-800">Canvas</h3>
        <canvas
          ref={canvasRef}
          width={600}
          height={400}
          className="rounded-lg border-2 border-gray-300 shadow-sm"
        />
      </div>
    </div>
  );
}
