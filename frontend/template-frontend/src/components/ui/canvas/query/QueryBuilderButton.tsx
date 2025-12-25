import { Database } from "lucide-react";
import { forwardRef } from "react";

export const QueryBuilderButton = forwardRef<HTMLButtonElement>((props, ref) => {
    return <button
        ref={ref}
        {...props}
        type='button'
        className="rounded flex flex-row gap-2 items-center px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-100 hover:text-slate-500 transition-colors duration-200"
    >
        <Database />
        Query Builder
    </button>
});