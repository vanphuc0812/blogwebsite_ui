import Header from '../components/Header/header';
import className from 'classnames/bind';
import styles from './HeaderOnly.module.scss';

const cx = className.bind(styles);
function HeaderOnly({ children }) {
    return (
        <div>
            <Header />
            <div className={cx('container')}>
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

export default HeaderOnly;
