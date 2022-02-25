/**
 * If the item is an array, return it. Otherwise, wrap it in an array
 * @param {T | T[]} item - T | T[]
 */
export const toArray = <T = any>(item: T | T[]) => (Array.isArray(item) ? item : [item]);

/**
 * If the item is an array, return the item at the given index. Otherwise, return the item
 * @param {T | T[]} item - The item or items to be converted to a single item.
 * @param [index=0] - The index of the item in the array to return.
 */
export const toSingle = <T = any>(item: T | T[], index = 0) => (Array.isArray(item) ? item[index] : item);
