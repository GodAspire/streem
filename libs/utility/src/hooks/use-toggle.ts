import { useCallback, useState } from 'react';

type UseToggle = [state: boolean, toggle: UseToggleCallback];
type UseToggleCallback = (bool?: boolean) => void;

// Parameter is the boolean, with default "false" value
export const useToggle = (initialState = false) => {
    // Initialize the state
    const [state, setState] = useState(initialState);

    // Define and memorize toggler function in case we pass down the component,
    // This function change the boolean value to it's opposite value
    const toggle = useCallback<UseToggleCallback>((bool?: boolean) => setState(state => bool || !state), []);

    return [state, toggle] as UseToggle;
};
