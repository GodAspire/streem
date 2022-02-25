import type { Color } from '@streem/utility/types';

export interface Theme {
    title: string;

    colors: {
        accent: Color;
        foreground: Color;
        background: Color;
        text: Color;
        subtext: Color;
    };
}
