import { useRef } from 'react';
import { useEffectOnce } from './use-effect-once';

/**
 * It allows you to run a callback when the component unmounts.
 * @param fn - The function to be invoked when the component unmounts.
 */
export const useUnmount = (fn: () => any): void => {
    const fnRef = useRef(fn);

    // update the ref each render so if it change the newest callback will be invoked
    fnRef.current = fn;

    useEffectOnce(() => () => fnRef.current());
};
