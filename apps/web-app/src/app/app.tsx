import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import Layout from '@streem/ui/layout';
import ViewsRouter from '@streem/ui/ViewsRouter';

const App = () => {
    return (
        <BrowserRouter>
            <RecoilRoot>
                <Layout>
                    <ViewsRouter />
                </Layout>
            </RecoilRoot>
        </BrowserRouter>
    );
};

export default App;
