import { useEffect, useRef, useState } from 'react';
import { useUnmount } from './use-unmount';

type ThrottleTimeout = ReturnType<typeof setTimeout>;

/**
 * It's a hook that throttles the value of a given state
 * @param {T} value - The value to throttle.
 * @param [ms=200] - The time to throttle the value, the default is 200ms.
 * @returns The throttled state.
 */
export const useThrottle = <T = any>(value: T, ms = 200) => {
    const [state, setState] = useState<T>(value);

    const nextValue = useRef<T>();
    const hasNextValue = useRef(0);
    const timeout = useRef<ThrottleTimeout>();

    useEffect(() => {
        if (!timeout.current) {
            setState(value);
            const timeoutCallback = () => {
                if (hasNextValue.current) {
                    hasNextValue.current = 0;

                    if (nextValue.current) setState(nextValue.current);

                    timeout.current = setTimeout(timeoutCallback, ms);
                } else {
                    timeout.current = undefined;
                }
            };
            timeout.current = setTimeout(timeoutCallback, ms);
        } else {
            nextValue.current = value;
            hasNextValue.current = 1;
        }
    }, [value, ms]);

    useUnmount(() => {
        timeout.current && clearTimeout(timeout.current);
    });

    return state;
};
