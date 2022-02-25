import { useEffect, useState } from 'react';

/**
 * Use the value of a state variable, but only after a delay
 * @param {T} value - The value to debounce.
 * @param {number} delay - The delay time in milliseconds.
 * @returns The debounced value.
 */
export const useDebounce = <T = any>(value: T, delay = 200) => {
    // State and setters for debounced value
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(
        () => {
            // Update debounced value after delay
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);

            // Cancel the timeout if value changes (also on delay change or unmount)
            // This is how we prevent debounced value from updating if value is changed ...
            // .. within the delay period. Timeout gets cleared and restarted.
            return () => {
                clearTimeout(handler);
            };
        },
        [value, delay] // Only re-call effect if value or delay changes
    );
    return debouncedValue;
};
