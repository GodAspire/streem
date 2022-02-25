// styles
import clx from '@streem/utility/clx';
import styles from './index.module.scss';

import type { ReactNode } from 'react';

const cx = clx(styles);

interface MainProps {
    children: ReactNode;
}

const Main = ({ children }: MainProps) => {
    return (
        <main className="flex flex-col flex-1 m-4 text-theme-text bg-theme-foreground">
            <div className={cx`router-outlet`}>{children}</div>
        </main>
    );
};

export default Main;
