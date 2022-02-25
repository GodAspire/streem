/* eslint-disable @typescript-eslint/no-empty-function, react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';

const _useTitle = (title: string, restoreOnUnmount = false) => {
    const prevTitleRef = useRef(document.title);
    if (document.title !== title) document.title = title;

    useEffect(() => {
        return () => {
            if (restoreOnUnmount) {
                document.title = prevTitleRef.current;
            }
        };
    }, []);
};

export const useTitle = (
    typeof document !== 'undefined' ? _useTitle : (_title: string, restoreOnUnmount?: boolean) => {}
) as typeof _useTitle;
