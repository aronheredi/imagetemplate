import { useLayersStore } from '@/stores/layers-store';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Circle, Eye, Square, Text, type LucideIcon } from 'lucide-react';
export default function LayerItem({ id,onLayerClick }: { id: string, onLayerClick: (id:string) => void }) {
    const { attributes, listeners, setNodeRef, transform } = useSortable({ id });
    const meta = useLayersStore((s) => s.byId[id]);
    const style = {
        transform: CSS.Translate.toString(transform),
    };
    const icons: Record<string, LucideIcon> = {
        'text': Text,
        'rectangle': Square,
        'circle': Circle,
    };

    if (!meta) {
        return null;
    }

    const Icon = icons[meta.type ?? 'rectangle'] ?? Square;
    return (
        <div ref={setNodeRef}  style={style}
         className={`w-full hover:bg-slate-100 px-2 py-1 cursor-pointer select-none rounded-lg flex flex-row  gap-4 items-center ${meta.selected ? 'bg-slate-100' : ''}`}
          onClick={() => onLayerClick(id)}
          
          >
            <div {...attributes} {...listeners} className="cursor-move p-1">
                <svg className="w-4 h-4 text-slate-400" viewBox="0 0 16 16" fill="currentColor">
                    <circle cx="4" cy="4" r="1.5" />
                    <circle cx="4" cy="8" r="1.5" />
                    <circle cx="4" cy="12" r="1.5" />
                    <circle cx="12" cy="4" r="1.5" />
                    <circle cx="12" cy="8" r="1.5" />
                    <circle cx="12" cy="12" r="1.5" />
                </svg>
            </div>
            <Eye className={`w-4 h-4 ${meta?.visible ? 'text-slate-900' : 'text-slate-400 line-through'}`} />
            <div className='flex flex-row gap-2 items-center'>
            <Icon className='w-4 h-4 ' />
            Layer {meta?.name}
            </div>
        </div>


    );
}