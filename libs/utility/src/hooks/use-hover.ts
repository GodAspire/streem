import { useState, useEffect, useRef } from 'react';

/**
 * It returns a ref and a the hover state.
 * @returns The ref and the value of the state.
 */
export const useHover = () => {
    const [value, setValue] = useState<boolean>(false);

    // Use generic block element as ref type
    const ref = useRef<Element>(null);

    const handleMouseOver = () => setValue(true);
    const handleMouseOut = () => setValue(false);

    useEffect(
        () => {
            const { current } = ref;

            if (current) {
                current.addEventListener('mouseover', handleMouseOver);
                current.addEventListener('mouseout', handleMouseOut);
            }

            return () => {
                if (current) {
                    current.removeEventListener('mouseover', handleMouseOver);
                    current.removeEventListener('mouseout', handleMouseOut);
                }
            };
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [ref.current] // Recall only if ref changes
    );

    return [ref, value] as [ref: typeof ref, state: boolean];
};
