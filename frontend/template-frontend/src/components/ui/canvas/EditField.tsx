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
        <div className="flex flex-row gap-2">
            {
                fields.map((field, index) => (
                    <div key={index}  >
                        <h3 className="text-lg font-semibold text-gray-800">
                            {field.label}
                        </h3>
                        {field.input}
                    </div>
                ))
            }
        </div>
    );
}