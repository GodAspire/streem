import { Sidenav, Main, Background } from './components';

// styles
import clx from '@streem/utility/clx';
import styles from './index.module.scss';

import type { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

const cx = clx(styles);

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="flex w-full h-screen relative">
            <Sidenav />

            <Main>{children}</Main>

            <Background />
        </div>
    );
};

export default Layout;
