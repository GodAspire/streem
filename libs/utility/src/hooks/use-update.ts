import { useReducer } from 'react';

const updateReducer = (num: number): number => (num + 1) % 1_000_000;

/**
 * It returns a function that increments the state.
 * @returns The `useUpdate` hook returns a function that can be used to update the state.
 */
export const useUpdate = () => {
    const [, update] = useReducer(updateReducer, 0);
    return update;
};
