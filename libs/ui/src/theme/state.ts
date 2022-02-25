import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

import { Theme, ThemeEffect } from './utility';
import Themes from './themes';

const { persistAtom } = recoilPersist();

const State = atom<Theme>({
    key: 'streem-theme',
    default: Themes.Viper,
    effects_UNSTABLE: [persistAtom, ThemeEffect],
});

export default State;
