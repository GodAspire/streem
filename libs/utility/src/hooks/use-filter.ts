import { useEffect, useState } from 'react';

type Predicate<T = any> = (value: T, index: number, array: T[]) => boolean;

export const useFilter = <T = any>(value: T[], predicate: Predicate<T>) => {
    const [filteredValue, setFilteredValue] = useState<T[]>();

    useEffect(() => {
        setFilteredValue(value.filter(predicate));
    }, [value, predicate]);

    return filteredValue;
};
