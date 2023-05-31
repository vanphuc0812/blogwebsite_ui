import Header from '../components/Header';
import Sidebar from './Sidebar';
import styles from './DefaultLayout.module.scss';
import className from 'classnames/bind';
import Footer from '../components/Footer';

const cx = className.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <div className={cx('content')}>{children}</div>
                <Sidebar />
            </div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
