import { closestCenter, DndContext, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import LayerItem from './LayerItem';
import { useLayersStore } from '@/stores/layers-store';
import type { Canvas } from 'fabric';
import { act, useEffect } from 'react';
interface LayersPanelProps {
    canvas?: Canvas | null;
}

export default function LayersPanel({canvas}: LayersPanelProps) {

    const sensors = useSensors(useSensor(PointerSensor));
    const toggleSelect = useLayersStore((s) => s.toggleSelect);
    const layers = useLayersStore((s) => s.order);
    const reorder = useLayersStore((s) => s.reorder);
    function onDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            reorder(active.id as string, over.id as string);
        }
    }
    //TODO: investigate why this doesnt work as intended
    useEffect(() => {
        if (!canvas) return;
        canvas.on('selection:created', () => {
            const active = canvas.getActiveObject();
            if (active && active.id) {
                toggleSelect(active.id);
            }
        });

        canvas.on('selection:updated', () => {
            const active = canvas.getActiveObject();
            if (active && active.id) {
                toggleSelect(active.id);
            }
        });
        canvas.on('selection:cleared', () => {
            toggleSelect('');
        });

        return () => {
            if (!canvas) return;
            canvas.off('selection:created');
            canvas.off('selection:updated');
            canvas.off('selection:cleared');
        };
    }, [canvas]);
    return (
        <div className="w-full overflow-y-auto h-full p-2 ">
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={onDragEnd}>
                <SortableContext items={layers} strategy={verticalListSortingStrategy}>
                    {layers.map((layerId) => (
                        <LayerItem key={layerId} id={layerId} />
                    ))}
                </SortableContext>

            </DndContext>
        </div>
    );
}