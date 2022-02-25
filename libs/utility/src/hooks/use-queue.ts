import { useState } from 'react';

export interface QueueMethods<T> {
    add: (item: T) => void;
    shift: () => T;
    first: T;
    last: T;
    size: number;
}

/**
 * It creates a queue.
 * @param initialValue - The initial value of the queue.
 * @returns A set of methods that can be used to interact with the queue.
 */
export const useQueue = <T = any>(initialValue: T[] = []): QueueMethods<T> => {
    const [state, set] = useState(initialValue);

    const add = (value: T) => set(queue => [...queue, value]);

    const shift = () => {
        let result: any;

        set(([first, ...rest]) => {
            result = first;
            return rest;
        });

        return result as T;
    };

    return {
        add,
        shift,
        get first() {
            return state[0];
        },
        get last() {
            return state[state.length - 1];
        },
        get size() {
            return state.length;
        },
    };
};
