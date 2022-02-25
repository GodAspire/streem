/**
 * If the document object is defined, run the function. Otherwise, if the log parameter is true, log
 * a message
 * @param fn - The function to run if the document object is defined.
 * @param [log=false] - If true, logs a message to the console when the guard fails.
 */
export const DocGuard = (fn: () => any, log = false) => {
    if (typeof document !== 'undefined') fn();
    else if (log) console.log('Failed Document Guard', fn);
};

/**
 * If the window object is defined, execute the function. Otherwise, if the log parameter is true, log
 * a message
 * @param fn - The function to run if the window object is defined.
 * @param [log=false] - If true, logs a message to the console when the guard fails.
 */
export const WinGuard = (fn: () => any, log = false) => {
    if (typeof window !== 'undefined') fn();
    else if (log) console.log('Failed Window Guard', fn);
};
