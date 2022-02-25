import { memo, ReactNode } from 'react';

import { v4 } from 'uuid';
import { useEnvironment } from '../hooks/use-environment';

interface PageProps {
    title?: string;
    children?: ReactNode;
    strict?: boolean;
}

/**
 * It renders a generic page with a title and its children.
 * @param {PageProps}  - title - The title of the page.
 */
const Page = ({ title = 'Page ' + v4(), children = null, strict = true }: PageProps) => {
    const { production } = useEnvironment();

    if (production) {
        const message = `Generic Page component '${title}'should only be used for prototyping in dev mode`;

        if (strict) throw new Error(message);
        else console.log(message);
    }

    return (
        <div className="page-container">
            <p>Welcome to {title}!</p>
            {children}
        </div>
    );
};

export default memo(Page, (props: PageProps, oldProps: PageProps) => props === oldProps);
