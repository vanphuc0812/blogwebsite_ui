import Header from '../components/Header/header';
import className from 'classnames/bind';
import styles from './HeaderOnly.module.scss';

const cx = className.bind(styles);
function HeaderOnly({ children }) {
    return (
        <div>
            <Header />
            <div className={cx('wrapper')}>
                <div className={cx('container')}>{children}</div>
            </div>
        </div>
    );
}

export default HeaderOnly;
