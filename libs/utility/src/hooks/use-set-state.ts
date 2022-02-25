import { useCallback, useState } from 'react';

/**
 * `useSetState` is a function that returns a tuple of two functions. The first function is a setter
 * function that takes a partial object and sets the state to the new object. The second function is a
 * getter function that returns the current state
 * @param {T} initialState - The initial state of the object.
 * @returns The first element is the state object, and the second element is a function that can be
 * used to update the state.
 */
export const useSetState = <T extends object>(
    initialState: T = {} as T
): [T, (patch: Partial<T> | ((prevState: T) => Partial<T>)) => void] => {
    const [state, set] = useState<T>(initialState);
    const setState = useCallback(patch => {
        set(prevState => Object.assign({}, prevState, patch instanceof Function ? patch(prevState) : patch));
    }, []);

    return [state, setState];
};
