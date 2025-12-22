import type { EditProps } from "@/types/canvas";
import { Select } from "radix-ui"

export const FontWeightDropdown = ({ selectedObject, update }: EditProps) => {
    const weights = [
        "normal", "bold", 100, 200, 300, 400, 500, 600, 700, 800, 900
    ]
    return (
        <div>
            <Select.Root onValueChange={(value) => update('fontWeight', isNaN(Number(value)) ? value : Number(value))} defaultValue={selectedObject.fontWeight?.toString() || "normal"}>
                <Select.Trigger className="inline-flex items-center justify-between rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full">
                    <Select.Value placeholder="Select font weight" />
                    <Select.Icon />
                </Select.Trigger>
                <Select.Content className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-lg">
                    <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-white cursor-default">
                        ▲
                    </Select.ScrollUpButton>
                    <Select.Viewport className="p-1">
                        {weights.map((weight) => (
                            <Select.Item key={weight} value={weight.toString()} className="relative flex items-center rounded-sm px-8 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 cursor-pointer select-none">
                                <Select.ItemText>{weight}</Select.ItemText>
                                <Select.ItemIndicator className="absolute left-0 inline-flex items-center justify-center w-6">
                                    ✓
                                </Select.ItemIndicator>
                            </Select.Item>
                        ))}
                    </Select.Viewport>
                    <Select.ScrollDownButton className="flex items-center justify-center h-6 bg-white cursor-default">
                        ▼
                    </Select.ScrollDownButton>
                </Select.Content>
            </Select.Root>
        </div>
    );
}