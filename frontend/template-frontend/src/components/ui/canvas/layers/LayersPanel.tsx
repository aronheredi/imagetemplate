import { closestCenter, DndContext, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import LayerItem from './LayerItem';
import { useLayersStore } from '@/stores/layers-store';

export default function LayersPanel() {

    const sensors = useSensors(useSensor(PointerSensor));

    const layers = useLayersStore((s) => s.order);
    const reorder = useLayersStore((s) => s.reorder);
    function onDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            reorder(active.id as string, over.id as string);
        }
    }
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