import Header from '../components/Header';
import Sidebar from '../components/Sidebar/sidebar';
import styles from './DefaultLayout.module.scss';
import className from 'classnames/bind';
import Footer from '../components/Footer';
import images from '../../asset/images';

const cx = className.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            {/* <img className={cx('banner')} src={images.banner} /> */}
            <div className={cx('container')}>
                <div className={cx('content')}>{children}</div>
                <Sidebar className={cx('sidebar')} />
            </div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
