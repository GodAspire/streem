import type { AtomEffect, DefaultValue } from 'recoil';
import type { Theme } from './model';

import { DocGuard } from '@streem/utility/misc/server';

const setThemeVars = ({ colors }: Theme) => {
    DocGuard(() => {
        const theme = Object.keys(colors);
        for (let i = 0; i < theme.length; i++) {
            const name = theme[i] as keyof typeof colors;
            const val = colors[name] || null;

            document.documentElement.style.setProperty(`--${name}`, val);
        }
    }, true);
};
const setInitialThemeVars = (theme: Theme | DefaultValue) => {
    setThemeVars(theme as Theme);
    return theme;
};

export const ThemeEffect: AtomEffect<Theme> = ({ onSet, setSelf }) => {
    onSet(setThemeVars);
    setSelf(setInitialThemeVars); // fixes theme flash issue on page load
};

export type { Theme } from './model';
