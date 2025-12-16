import type { CanvasTool } from '@/types/canvas';
import { Circle as FabricCircle, Rect, Textbox, type Canvas } from 'fabric';
import { Bug, MousePointer2, Square, Circle, ALargeSmall } from 'lucide-react';
import { useEditorStore } from '@/stores/editor-store';
const newObjectId = () =>
  (typeof crypto !== 'undefined' && 'randomUUID' in crypto)
    ? crypto.randomUUID()
    : `obj_${Date.now()}_${Math.random().toString(16).slice(2)}`;
export const CanvasTools = ({ canvas }: { canvas: Canvas | null }) => {
  const activeTool = useEditorStore((state) => state.activeTool);
  const setActiveTool = useEditorStore((state) => state.setActiveTool);

  const handleAddElement = (tool: CanvasTool) => {
    if (!canvas) return;

    setActiveTool(tool.type);

    switch (tool.type) {
      case 'select':
        return;

      case 'debug':
        console.log(canvas.toObject(['name']));
        return;

      case 'rect': {
        const obj = new Rect({
          left: 100,
          top: 100,
          fill: '#ef4444',
          width: 160,
          height: 120,
        });
        obj.set('name', String(canvas.getObjects().length));
        obj.set('id', newObjectId());
        canvas.add(obj);
        canvas.setActiveObject(obj);
        canvas.requestRenderAll();
        return;
      }

      case 'circle': {
        const obj = new FabricCircle({
          left: 150,
          top: 150,
          fill: '#3b82f6',
          radius: 60,
        });
        obj.set('name', String(canvas.getObjects().length));
        obj.set('id', newObjectId());
        canvas.add(obj);
        canvas.setActiveObject(obj);
        canvas.requestRenderAll();
        return;
      }

      case 'text': {
        const obj = new Textbox('Edit me', {
          left: 200,
          top: 200,
          fontSize: 28,
          fill: '#111827',
          width: 240,
        });
        obj.set('id', newObjectId());
        obj.set('name', String(canvas.getObjects().length));
        canvas.add(obj);
        canvas.setActiveObject(obj);
        canvas.requestRenderAll();
        return;
      }

      default:
        return;
    }
  };

  const tools: CanvasTool[] = [
    { type: 'select', label: 'Select', icon: MousePointer2 },
    { type: 'rect', label: 'Rectangle', icon: Square },
    { type: 'circle', label: 'Circle', icon: Circle },
    { type: 'text', label: 'Text', icon: ALargeSmall },
    { type: 'debug', label: 'Debug', icon: Bug },
  ];

  return (
    <div className="flex h-full w-16 flex-col gap-3 bg-white p-2">
      {tools.map((tool) => (
        <button
          type="button"
          key={tool.type}
          onClick={() => handleAddElement(tool)}
          className={`rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${activeTool === tool.type
            ? 'bg-slate-100 text-slate-900'
            : 'border-gray-300 bg-white text-slate-500 hover:bg-slate-100 hover:text-slate-900'
            }`}
          title={tool.label}
        >
          <tool.icon />
        </button>
      ))}
    </div>
  );
};