import type { QueryProperty } from "@/types/query";

export const fabricQuerySchema: Record<string, QueryProperty[]> = {
    rect: [
        {
            key: 'left',
            label: 'X Position',
            type: 'number'
        },
        {
            key: 'top',
            label: 'Y Position',
            type: 'number'
        },
        {
            key: 'width',
            label: 'Width',
            type: 'number'
        },
        {
            key: 'height',
            label: 'Height',
            type: 'number'
        },
        {
            key: 'fill',
            label: 'Color',
            type: 'color'
        },
        {
            key: 'stroke',
            label: 'Stroke Color',
            type: 'color'
        },
        {
            key: 'strokeWidth',
            label: 'Stroke Width',
            type: 'number'
        },
        {
            key: 'rx',
            label: 'Corner Radius X',
            type: 'number'
        },
        {
            key: 'ry',
            label: 'Corner Radius Y',
            type: 'number'
        },
        {
            key: 'angle',
            label: 'Rotation',
            type: 'number'
        },
        {
            key: 'opacity',
            label: 'Opacity',
            type: 'number'
        },
        {
            key: 'scaleX',
            label: 'Scale X',
            type: 'number'
        },
        {
            key: 'scaleY',
            label: 'Scale Y',
            type: 'number'
        },
        {
            key: 'skewX',
            label: 'Skew X',
            type: 'number'
        },
        {
            key: 'skewY',
            label: 'Skew Y',
            type: 'number'
        },
    ],
    circle: [
        {
            key: 'left',
            label: 'X Position',
            type: 'number'
        },
        {
            key: 'top',
            label: 'Y Position',
            type: 'number'
        },
        {
            key: 'radius',
            label: 'Radius',
            type: 'number'
        },
        {
            key: 'startAngle',
            label: 'Start Angle',
            type: 'number'
        },
        {
            key: 'endAngle',
            label: 'End Angle',
            type: 'number'
        },
        {
            key: 'fill',
            label: 'Color',
            type: 'color'
        },
        {
            key: 'stroke',
            label: 'Stroke Color',
            type: 'color'
        },
        {
            key: 'strokeWidth',
            label: 'Stroke Width',
            type: 'number'
        },
        {
            key: 'angle',
            label: 'Rotation',
            type: 'number'
        },
        {
            key: 'opacity',
            label: 'Opacity',
            type: 'number'
        },
        {
            key: 'scaleX',
            label: 'Scale X',
            type: 'number'
        },
        {
            key: 'scaleY',
            label: 'Scale Y',
            type: 'number'
        },
        {
            key: 'skewX',
            label: 'Skew X',
            type: 'number'
        },
        {
            key: 'skewY',
            label: 'Skew Y',
            type: 'number'
        },
    ],
    textbox: [
        {
            key: 'text',
            label: 'Text Content',
            type: 'string'
        },
        {
            key: 'fontFamily',
            label: 'Font Family',
            type: 'string'
        },
        {
            key: 'fontSize',
            label: 'Font Size',
            type: 'number'
        },
        {
            key: 'fontWeight',
            label: 'Font Weight',
            type: 'string'
        },
        {
            key: 'fontStyle',
            label: 'Font Style',
            type: 'string'
        },
        {
            key: 'textAlign',
            label: 'Text Align',
            type: 'string'
        },
        {
            key: 'lineHeight',
            label: 'Line Height',
            type: 'number'
        },
        {
            key: 'charSpacing',
            label: 'Char Spacing',
            type: 'number'
        },
        {
            key: 'fill',
            label: 'Text Color',
            type: 'color'
        },
        {
            key: 'textBackgroundColor',
            label: 'Background Color',
            type: 'color'
        },
        {
            key: 'underline',
            label: 'Underline',
            type: 'boolean'
        },
        {
            key: 'overline',
            label: 'Overline',
            type: 'boolean'
        },
        {
            key: 'linethrough',
            label: 'Linethrough',
            type: 'boolean'
        },
        {
            key: 'left',
            label: 'X Position',
            type: 'number'
        },
        {
            key: 'top',
            label: 'Y Position',
            type: 'number'
        },
        {
            key: 'width',
            label: 'Width',
            type: 'number'
        },
        {
            key: 'height',
            label: 'Height',
            type: 'number'
        },
        {
            key: 'stroke',
            label: 'Stroke Color',
            type: 'color'
        },
        {
            key: 'strokeWidth',
            label: 'Stroke Width',
            type: 'number'
        },
        {
            key: 'angle',
            label: 'Rotation',
            type: 'number'
        },
        {
            key: 'opacity',
            label: 'Opacity',
            type: 'number'
        },
        {
            key: 'scaleX',
            label: 'Scale X',
            type: 'number'
        },
        {
            key: 'scaleY',
            label: 'Scale Y',
            type: 'number'
        },
        {
            key: 'skewX',
            label: 'Skew X',
            type: 'number'
        },
        {
            key: 'skewY',
            label: 'Skew Y',
            type: 'number'
        },
    ],
    image: [
        {
            key: 'src',
            label: 'Source URL',
            type: 'string'
        },
        {
            key: 'cropX',
            label: 'Crop X',
            type: 'number'
        },
        {
            key: 'cropY',
            label: 'Crop Y',
            type: 'number'
        },
        {
            key: 'left',
            label: 'X Position',
            type: 'number'
        },
        {
            key: 'top',
            label: 'Y Position',
            type: 'number'
        },
        {
            key: 'width',
            label: 'Width',
            type: 'number'
        },
        {
            key: 'height',
            label: 'Height',
            type: 'number'
        },
        {
            key: 'angle',
            label: 'Rotation',
            type: 'number'
        },
        {
            key: 'opacity',
            label: 'Opacity',
            type: 'number'
        },
        {
            key: 'scaleX',
            label: 'Scale X',
            type: 'number'
        },
        {
            key: 'scaleY',
            label: 'Scale Y',
            type: 'number'
        },
        {
            key: 'skewX',
            label: 'Skew X',
            type: 'number'
        },
        {
            key: 'skewY',
            label: 'Skew Y',
            type: 'number'
        },
    ]
}