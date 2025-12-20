import type { Template } from "@/types/templates";
import { ActionsPopover } from "./ActionsPopover";

interface TemplatesCardProps {
    template: Template;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
}

export const TemplatesCard = ({ template, onEdit, onDelete }: TemplatesCardProps) => {

    return <div className="flex flex-col rounded-lg border border-slate-200 hover:border-slate-400 transition-colors">
        <div className="aspect-[1.91/1] w-full mt-3 bg-slate-100">

        </div>
        <div className="flex flex-row items-center justify-between m-2 p-4" >
            <div className="p-4 flex flex-col flex-grow flex-1 overflow-hidden">
                <h2 className="text-lg font-semibold text-slate-900 mb-2 overflow-clip"> {template.name} </h2>
                <p className="text-sm text-slate-500 overflow-clip wrap-break-word  "> {template.id} </p>
            </div>
            <ActionsPopover onEdit={() => onEdit?.(template.id)} onDelete={() => onDelete?.(template.id)} />
        </div>
    </div>;
}