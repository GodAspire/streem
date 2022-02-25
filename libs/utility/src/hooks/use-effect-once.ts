import { EffectCallback, useEffect } from 'react';

/**
 * `useEffectOnce` is a function that takes an effect callback and returns a function that calls the effect callback once
 * @param {EffectCallback} effect - The effect callback to run.
 */
export const useEffectOnce = (effect: EffectCallback) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(effect, []);
};
