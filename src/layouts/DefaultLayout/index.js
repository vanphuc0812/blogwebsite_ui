import Header from '../components/Header/header';
import Sidebar from '../components/Sidebar/sidebar';
import styles from './DefaultLayout.module.scss';
import className from 'classnames/bind';
import Footer from '../components/Footer';
import images from '../../asset/images';
import StickyBox from 'react-sticky-box';

const cx = className.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            {/* <img className={cx('banner')} src={images.banner} /> */}
            <div className={cx('container')}>
                <div className={cx('content')}>{children}</div>
                <div className={cx('sidebar')}>
                    <StickyBox offsetTop={90}>
                        <Sidebar />
                    </StickyBox>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
