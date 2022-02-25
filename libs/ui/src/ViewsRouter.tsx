import { Routes, Route, Navigate } from 'react-router-dom';
import Views from './views';

const ViewsRouter = () => {
    return (
        <Routes>
            {/* routes */}
            <Route path="/home" element={<Views.Home />} />
            <Route path="/settings" element={<Views.Settings />} />
            <Route path="/404" element={<Views.NotFound />} />

            {/* redirects */}
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
    );
};

export default ViewsRouter;
