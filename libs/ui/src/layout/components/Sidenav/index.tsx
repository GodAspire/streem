// styles
import clx from '@streem/utility/clx';
import styles from './index.module.scss';

const cx = clx(styles);

const Sidenav = () => {
    return (
        <aside className="flex flex-col  m-4 mr-0 text-theme-text">
            <h1>Sidebar</h1>
        </aside>
    );
};

export default Sidenav;
