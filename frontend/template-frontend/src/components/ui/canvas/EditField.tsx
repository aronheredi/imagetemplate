import type { ReactNode } from "react";

interface FieldItem {
    label: string;
    input: ReactNode;
}

interface EditFieldProps {
    fields: FieldItem[];
}

export const EditField = ({ fields }: EditFieldProps) => {
    return (
        <div
            className="grid gap-2"
            style={{ gridTemplateColumns: `repeat(${fields.length}, minmax(0, 1fr))` }}
        >
            {
                fields.map((field, index) => (
                    <div key={index} className="min-w-0"  >
                        <h3 className="text-sm  text-slate-900">
                            {field.label}
                        </h3>

                        <div >
                            {field.input}
                        </div>
                    </div>
                ))
            }
        </div>
    );
}