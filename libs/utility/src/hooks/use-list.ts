import { useMemo, useRef } from 'react';
import { useUpdate } from './use-update';

/**
 * If the next state is a function, call it with the current state as an argument. Otherwise, return
 * the next state
 * @param nextState - The next state to be resolved.
 * @param {C} [currentState] - The current state of the hook.
 * @returns The next state.
 */
export function resolveHookState<S, C extends S>(nextState: IHookStateResolvable<S>, currentState?: C): S {
    if (typeof nextState === 'function') {
        // eslint-disable-next-line @typescript-eslint/ban-types
        return nextState.length ? (nextState as Function)(currentState) : (nextState as Function)();
    }

    return nextState;
}

export type IHookStateSetter<S> = ((prevState: S) => S) | (() => S);
export type IHookStateInitialSetter<S> = () => S;
export type IHookStateInitAction<S> = S | IHookStateInitialSetter<S>;

export type IHookStateSetAction<S> = S | IHookStateSetter<S>;
export type IHookStateResolvable<S> = S | IHookStateInitialSetter<S> | IHookStateSetter<S>;

export interface ListActions<T> {
    /**
     * @description Set new list instead old one
     */
    set: (newList: IHookStateSetAction<T[]>) => void;
    /**
     * @description Add item(s) at the end of list
     */
    push: (...items: T[]) => void;

    /**
     * @description Replace item at given position. If item at given position not exists it will be set.
     */
    updateAt: (index: number, item: T) => void;
    /**
     * @description Insert item at given position, all items to the right will be shifted.
     */
    insertAt: (index: number, item: T) => void;

    /**
     * @description Replace all items that matches predicate with given one.
     */
    update: (predicate: (a: T, b: T) => boolean, newItem: T) => void;
    /**
     * @description Replace first item matching predicate with given one.
     */
    updateFirst: (predicate: (a: T, b: T) => boolean, newItem: T) => void;
    /**
     * @description Like `updateFirst` bit in case of predicate miss - pushes item to the list
     */
    upsert: (predicate: (a: T, b: T) => boolean, newItem: T) => void;

    /**
     * @description Sort list with given sorting function
     */
    sort: (compareFn?: (a: T, b: T) => number) => void;
    /**
     * @description Same as native Array's method
     */
    filter: (callbackFn: (value: T, index?: number, array?: T[]) => boolean, thisArg?: any) => void;

    /**
     * @description Removes item at given position. All items to the right from removed will be shifted.
     */
    removeAt: (index: number) => void;
    /**
     * @deprecated Use removeAt method instead
     */
    remove: (index: number) => void;

    /**
     * @description Make the list empty
     */
    clear: () => void;
    /**
     * @description Reset list to initial value
     */
    reset: () => void;
}

/**
 * It returns a list of items and a set of actions that can be used to manipulate the list.
 * @param initialList - IHookStateInitAction<T[]> = []
 * @returns The first element is the list of items. The second element is the actions object.
 */
function useList<T = any>(initialList: IHookStateInitAction<T[]> = []): [T[], ListActions<T>] {
    const list = useRef(resolveHookState(initialList));
    const update = useUpdate();

    const actions = useMemo<ListActions<T>>(() => {
        const a = {
            set: (newList: IHookStateSetAction<T[]>) => {
                list.current = resolveHookState(newList, list.current);
                update();
            },

            push: (...items: T[]) => {
                items.length && actions.set((curr: T[]) => curr.concat(items));
            },

            updateAt: (index: number, item: T) => {
                actions.set((curr: T[]) => {
                    const arr = curr.slice();

                    arr[index] = item;

                    return arr;
                });
            },

            insertAt: (index: number, item: T) => {
                actions.set((curr: T[]) => {
                    const arr = curr.slice();

                    index > arr.length ? (arr[index] = item) : arr.splice(index, 0, item);

                    return arr;
                });
            },

            update: (predicate: (a: T, b: T) => boolean, newItem: T) => {
                actions.set((curr: T[]) => curr.map(item => (predicate(item, newItem) ? newItem : item)));
            },

            updateFirst: (predicate: (a: T, b: T) => boolean, newItem: T) => {
                const index = list.current.findIndex((item: T) => predicate(item, newItem));

                index >= 0 && actions.updateAt(index, newItem);
            },

            upsert: (predicate: (a: T, b: T) => boolean, newItem: T) => {
                const index = list.current.findIndex((item: T) => predicate(item, newItem));

                index >= 0 ? actions.updateAt(index, newItem) : actions.push(newItem);
            },

            sort: (compareFn?: (a: T, b: T) => number) => {
                actions.set((curr: T[]) => curr.slice().sort(compareFn));
            },

            filter: <S extends T>(callbackFn: (value: T, index: number, array: T[]) => value is S, thisArg?: any) => {
                actions.set((curr: T[]) => curr.slice().filter(callbackFn, thisArg));
            },

            removeAt: (index: number) => {
                actions.set((curr: T[]) => {
                    const arr = curr.slice();

                    arr.splice(index, 1);

                    return arr;
                });
            },

            clear: () => {
                actions.set([]);
            },

            reset: () => {
                actions.set(resolveHookState(initialList).slice());
            },
        };

        /**
         * @deprecated Use removeAt method instead
         */
        (a as ListActions<T>).remove = a.removeAt;

        return a as ListActions<T>;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return [list.current, actions];
}

export default useList;
