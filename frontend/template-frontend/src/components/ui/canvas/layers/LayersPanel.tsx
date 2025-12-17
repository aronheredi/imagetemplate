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
    const handleLayerClick = (objId: string) => {
        toggleSelect(objId);
        if(canvas){
            const obj = canvas.getObjects().find(o => o.id === objId);
            if(obj){
                canvas.setActiveObject(obj);
                canvas.requestRenderAll();
            }
        }
    }
    useEffect(() => {
        if (!canvas) return;
        const handleSelectionCreated = () => {
                const active = canvas.getActiveObject();
                if (active?.id) {
                    console.log('selection created', active.id);
                    toggleSelect(active.id);
                }   
            }
            const handleSelectionUpdated = () => {
                const active = canvas.getActiveObject();
                if (active?.id) {
                    console.log('selection updated', active.id);
                    toggleSelect(active.id);
                }
            }
            const handleSelectionCleared = () => {
                console.log('selection cleared');
                toggleSelect('');
            }
        canvas.on('selection:created', handleSelectionCreated);
        canvas.on('selection:updated', handleSelectionUpdated);
        canvas.on('selection:cleared', handleSelectionCleared);
       
    

        

        return () => {
            if (!canvas) return;
            canvas.off('selection:created',handleSelectionCreated);
            canvas.off('selection:updated',handleSelectionUpdated);
            canvas.off('selection:cleared',handleSelectionCleared);
        };
    }, [canvas, toggleSelect]);
    return (
        <div className="w-full overflow-y-auto h-full p-2 ">
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={onDragEnd}>
                <SortableContext items={layers} strategy={verticalListSortingStrategy}>
                    {layers.map((layerId) => (
                        <LayerItem key={layerId} id={layerId} onLayerClick={handleLayerClick} />
                    ))}
                </SortableContext>

            </DndContext>
        </div>
    );
}