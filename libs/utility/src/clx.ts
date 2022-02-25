import { toArray } from './misc/arrays';

type Styles = { [className: string]: string };
type ClassNames = TemplateStringsArray | string;

/**
 * `Clx` is a function that takes in a list of styles and returns a function that takes in a classname and returns a string of classnames
 * @param {Styles[] | Styles} styles - The styles to merge.
 * @param [fallback=true] - boolean
 * @returns A function that takes a classname and returns a string of classnames.
 */
const Clx = (styles: Styles[] | Styles, fallback = true) => {
    const merged = mergeStyles(...toArray(styles));

    const cx = (name: ClassNames, ...vars: string[]) => {
        const classList = `${name}`.split(' ');
        const initialClasses = [...classList, ...vars];
        const finalClasses: string[] = [];

        for (let i = 0; i < initialClasses.length; i++) {
            const initialClass = initialClasses[i].trim();

            // check if classname is empty; if true continue looping
            if (['', '\n'].includes(initialClass)) continue;

            const scssClass = merged[initialClass] || '';
            const scssPrefix = scssClass ? ' ' : '';
            const fallbackClass = fallback ? initialClass : '';
            const finalClass = fallbackClass + scssPrefix + scssClass;

            if (finalClass) finalClasses.push(finalClass);
        }

        return finalClasses.join(' ');
    };

    return cx;
};

/**
 * Merge Styles into one
 * @param {Styles} styles - An array of styles containing style properties.
 * @returns Object containing the merged style properties.
 */
export const mergeStyles = (...styles: Styles[]) => styles.reduce((obj, style) => ({ ...obj, ...style }), {});

export default Clx;
