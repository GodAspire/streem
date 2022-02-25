import { memo, ReactNode } from 'react';

interface IfProps {
    condition: boolean;
    children: ReactNode;
    else?: ReactNode;
}

/**
 * If the condition is true, render the children, otherwise render the elseTemplate
 * @param {boolean} condition - boolean
 * @param {ReactNode} children - The child nodes to render if the condition is true.
 * @param {ReactNode} [elseTemplate] - If the condition is false, this is the template that will be
 * rendered.
 * @returns A React component.
 */
const If = (props: IfProps) => {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{props.condition ? props.children : props.else || null}</>;
};

export default memo(If, (props: IfProps, oldProps: IfProps) => props.condition === oldProps.condition);
