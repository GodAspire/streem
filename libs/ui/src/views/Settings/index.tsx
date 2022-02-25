// styles
import clx from '@streem/utility/clx';
import styles from './index.module.scss';

const cx = clx(styles);

const Page = () => {
    return <p className={cx`welcome`}>Welcome to Settings!</p>;
};

export default Page;
