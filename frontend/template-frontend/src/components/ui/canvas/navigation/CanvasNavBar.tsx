import api from "@/api/axios";
import { useCanvasStore } from "@/stores/canvas-store";
import { useEditorStore } from "@/stores/editor-store";
import { Code, SaveIcon } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

export const CanvasNavBar = () => {
    const [isSaving, setIsSaving] = useState(false);
    const location = useLocation();
    const canvas = useCanvasStore((state) => state.canvas);
    const id = useParams().id as string;
    const isActive = (path: string) => location.pathname === path;
    const setIsJsonPanelOpen = useEditorStore((state) => state.setJsonPanelOpen);
    const onSave = async () => {
        if (!canvas) return;
        try {

            setIsSaving(true);
            const json = canvas.toJSON();

            console.log('Saving canvas data...', json);
            const response = await api.patch(`/templates/${id}`, { json });

            if (response.status < 200 || response.status >= 300) {
                throw new Error('Network response was not ok');
            }

        } finally {
            setIsSaving(false);
        }
    };
    return (
        <nav className="fixed left-0 right-0 top-0 z-50 pr-4 pl-4 bg-white/80 shadow-lg">

            <div className="flex h-16 items-center justify-end ">


                <div className="flex space-x-4">
                    <button
                        onClick={() => setIsJsonPanelOpen(true)}
                        className="rounded flex flex-row gap-2 items-center px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-100 hover:text-slate-500 transition-colors duration-200"
                    >
                        <Code />
                        Code
                    </button>
                    <button
                        onClick={() => onSave()}
                        className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-primary/90 h-9 px-4 py-2 has-[>svg]:px-3 bg-gradient-to-r from-slate-600 to-slate-800 hover:from-slate-700 hover:to-slate-900 text-white shadow-sm transition-all active:scale-95 ${isSaving ? 'opacity-50 pointer-events-none' : ''
                            }`}
                    >
                        <SaveIcon />
                        Save Changes
                    </button>
                </div>
            </div>

        </nav>
    );
}