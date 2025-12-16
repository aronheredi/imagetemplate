import { useLayersStore } from '@/stores/layers-store';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
export default function LayerItem({ id }: { id: string }) {
    const { attributes, listeners, setNodeRef, transform } = useSortable({ id });
    const meta = useLayersStore((s) => s.byId[id]);
    const style = {
        transform: CSS.Translate.toString(transform),
    };
    return (
        <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
            Layer {meta?.name}
        </div>


    );
}