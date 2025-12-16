import { useMemo, useState } from 'react';
import { SketchPicker, type RGBColor } from 'react-color';
interface ColorPickerProps {
    onChange?: (color: RGBColor) => void;
    initialColor?: RGBColor;

}
export default function ColorPicker({ onChange, initialColor }: ColorPickerProps) {
    const [displayColorPicker, setDisplayColorPicker] = useState(false);
    const [color, setColor] = useState<RGBColor>(initialColor || { r: 241, g: 112, b: 19, a: 1 });

    const rgba = useMemo(
        () => `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a ?? 1})`,
        [color],
    );

    return (
        <div className="relative inline-block">
            <button
                type="button"
                onClick={() => setDisplayColorPicker((v) => !v)}
                className="inline-block cursor-pointer rounded bg-white p-[5px] shadow-[0_0_0_1px_rgba(0,0,0,0.1)]"
                aria-label="Pick a color"
                aria-expanded={displayColorPicker}
            >
                <span
                    className="block h-[14px] w-[36px] rounded-sm"
                    style={{ background: rgba }}
                />
            </button>

            {displayColorPicker ? (
                <div className="absolute z-20 mt-2">
                    <button
                        type="button"
                        className="fixed inset-0 cursor-default"
                        onClick={() => setDisplayColorPicker(false)}
                        aria-label="Close color picker"
                    />
                    <div className="relative">
                        <SketchPicker
                            color={color}
                            onChange={(next) => { setColor(next.rgb); if (onChange) onChange(next.rgb); console.log(next.rgb); }}
                        />
                    </div>
                </div>
            ) : null}
        </div>
    );
}