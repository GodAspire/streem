import { useRecoilValue } from 'recoil';
import { ThemeState } from '../../theme';

const Background = () => {
    const { title } = useRecoilValue(ThemeState);
    return (
        <div className="-z-[99] w-full h-screen fixed top-0 left-0 bg-theme-background">
            <p className="opacity-0">{title}</p>
        </div>
    );
};

export default Background;
