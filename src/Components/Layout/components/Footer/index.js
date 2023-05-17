import styles from './Footer.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('footer')}>
            <div className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <div className={cx('about')}>
                        <h2>VỀ CHÚNG TÔI</h2>
                        <p>Plog là trang web cá nhân với mục đích ban đầu là học tập, lấy ý tưởng từ Viblo.asia</p>
                    </div>
                    <div className={cx('resources')}>
                        <h2>TÀI NGUYÊN</h2>
                        <div className={cx('resource')}>
                            <div className={cx('left')}>
                                <ul>
                                    <li>
                                        <a className={cx('resource-btn')}>Tổ chức</a>
                                    </li>
                                    <li>
                                        <a className={cx('resource-btn')}>Bài viết</a>
                                    </li>
                                    <li>
                                        <a className={cx('resource-btn')}>Câu hỏi</a>
                                    </li>
                                    <li>
                                        <a className={cx('resource-btn')}>Tags</a>
                                    </li>
                                    <li>
                                        <a className={cx('resource-btn')}>Videos</a>
                                    </li>
                                    <li>
                                        <a className={cx('resource-btn')}>Tác giả</a>
                                    </li>
                                </ul>
                            </div>
                            <div className={cx('right')}>
                                <ul>
                                    <li>
                                        <a className={cx('resource-btn')}>Thảo luận</a>
                                    </li>
                                    <li>
                                        <a className={cx('resource-btn')}>Đề xuất hệ thống</a>
                                    </li>
                                    <li>
                                        <a className={cx('resource-btn')}>Công cụ</a>
                                    </li>
                                    <li>
                                        <a className={cx('resource-btn')}>Machine Learning</a>
                                    </li>
                                    <li>
                                        <a className={cx('resource-btn')}>Trạng thái hệ thống</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={cx('social')}>
                        <h2>GIỮ KẾT NỐI</h2>
                        <FontAwesomeIcon className={cx('social-icon')} icon={faFacebook} />
                        <FontAwesomeIcon className={cx('social-icon')} icon={faTwitter} />
                        <FontAwesomeIcon className={cx('social-icon')} icon={faInstagram} />
                        <FontAwesomeIcon className={cx('social-icon')} icon={faWhatsapp} />
                    </div>
                    <div className={cx('contact')}>
                        <h2>THÔNG TIN LIÊN LẠC</h2>
                    </div>
                </div>
                <hr></hr>
                <div className={cx('additional')}>
                    <div className={cx('copyright')}>
                        <p>
                            © 2023
                            <b> Plog</b>. All rights reserved.
                        </p>
                    </div>
                    <div>
                        <ul>
                            <li>
                                <a href="/feedback">Phản hồi</a>
                            </li>
                            <li>
                                <a href="/helps">Giúp đỡ</a>
                            </li>
                            <li>
                                <a href="/faq">FAQs</a>
                            </li>
                            <li>
                                <a href="/rss-channels">RSS</a>
                            </li>
                            <li>
                                <a href="/terms/vi_term">Điều khoản</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
