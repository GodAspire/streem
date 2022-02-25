import { RecoilRoot } from 'recoil';
import type { ReactNode } from 'react';

interface RootProps {
    children: ReactNode;
}

const Root = ({ children }: RootProps) => {
    return <RecoilRoot>{children}</RecoilRoot>;
};

export default Root;
