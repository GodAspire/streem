import { useCallback, useEffect, useRef } from 'react';

/**
 * Checks if a component is mounted or not.
 * @returns A function that returns a the mounted state as boolean.
 */
export const useMountedState = () => {
    const mountedRef = useRef<boolean>(false);
    const get = useCallback(() => mountedRef.current, []);

    useEffect(() => {
        mountedRef.current = true;

        return () => {
            mountedRef.current = false;
        };
    }, []);

    return get;
};
