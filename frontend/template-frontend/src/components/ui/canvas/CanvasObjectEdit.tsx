import type { Canvas, FabricObject } from 'fabric';
import { CommonEdit } from './edit/CommonEdit';
import RectangleEdit from './edit/RectangleEdit';
import Break from '@/components/common/Break';
import { useEffect, useMemo, useReducer } from 'react';
import { useEditorStore } from '@/stores/editor-store';
import { CircleEdit } from './edit/CircleEdit';
import { TextEdit } from './edit/TextEdit';
import React from 'react';

export const CanvasObjectEdit = ({
  canvas

}: { canvas: Canvas | null; }) => {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const activeObjectId = useEditorStore((state) => state.activeObjectId);

  const selectedObject: FabricObject | null = useMemo(() => {
    if (!canvas || !activeObjectId) return null;
    const obj = canvas.getObjects().find((o) => (o).id === activeObjectId);
    return (obj as FabricObject) || null;
  }, [canvas, activeObjectId]);

  const hasSelection = Boolean(canvas && selectedObject);

  useEffect(() => {
    if (!canvas) return;

    const handleUpdate = () => forceUpdate();

    // keep UI responsive to both transforms and selection changes
    canvas.on('object:modified', handleUpdate);
    canvas.on('object:moving', handleUpdate);
    canvas.on('object:scaling', handleUpdate);
    canvas.on('object:rotating', handleUpdate);
    canvas.on('object:resizing', handleUpdate);
    canvas.on('selection:created', handleUpdate);
    canvas.on('selection:updated', handleUpdate);
    canvas.on('selection:cleared', handleUpdate);

    return () => {
      canvas.off('object:modified', handleUpdate);
      canvas.off('object:moving', handleUpdate);
      canvas.off('object:scaling', handleUpdate);
      canvas.off('object:rotating', handleUpdate);
      canvas.off('object:resizing', handleUpdate);
      canvas.off('selection:created', handleUpdate);
      canvas.off('selection:updated', handleUpdate);
      canvas.off('selection:cleared', handleUpdate);
    };
  }, [canvas]);

  const update = (key: string, value: string | number) => {
    if (!canvas || !selectedObject) return;
    selectedObject.set(key, value);
    canvas.fire('object:modified', { target: selectedObject });
    canvas.renderAll();
    forceUpdate();
  };
  const editPanels = {
    'rect': RectangleEdit,
    'circle': CircleEdit,
    'textbox': TextEdit
  }
  return (
    <aside className="flex h-full w-80 flex-col gap-3 border-l border-gray-200 bg-white p-4">
      <h3 className="text-lg font-semibold text-gray-800">Properties</h3>

      {(hasSelection && selectedObject) ? (
        <>
          <CommonEdit update={update} selectedObject={selectedObject} />
          <Break />

          {editPanels[selectedObject.type as keyof typeof editPanels] ? (React.createElement(editPanels[selectedObject.type as keyof typeof editPanels], { selectedObject, update })) : null}
        </>
      ) : (
        <div className="text-sm text-gray-500">Select an object to edit its properties.</div>
      )}
    </aside>
  );
};