import styles from './Footer.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <footer className={cx('footer')}>
            <div className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <div className={cx('about')}>
                        <h2>ABOUT US</h2>
                        <p>Plog is a personal website which has studying as initial purpose, refering to Viblo.asia</p>
                        <p> Plog is in developing.</p>
                    </div>
                    <div className={cx('resources')}>
                        <h2>RESOURCES</h2>
                        <div className={cx('resource')}>
                            <div className={cx('left')}>
                                <ul>
                                    <li>
                                        <a className={cx('resource-btn')}>Organizations</a>
                                    </li>
                                    <li>
                                        <a className={cx('resource-btn')}>Posts</a>
                                    </li>
                                    <li>
                                        <a className={cx('resource-btn')}>Questions</a>
                                    </li>
                                    <li>
                                        <a className={cx('resource-btn')}>Tags</a>
                                    </li>
                                    <li>
                                        <a className={cx('resource-btn')}>Videos</a>
                                    </li>
                                    <li>
                                        <a className={cx('resource-btn')}>Authors</a>
                                    </li>
                                </ul>
                            </div>
                            <div className={cx('right')}>
                                <ul>
                                    <li>
                                        <a className={cx('resource-btn')}>Discussions</a>
                                    </li>
                                    <li>
                                        <a className={cx('resource-btn')}>Recommended systems</a>
                                    </li>
                                    <li>
                                        <a className={cx('resource-btn')}>Tools</a>
                                    </li>
                                    <li>
                                        <a className={cx('resource-btn')}>Machine Learning</a>
                                    </li>
                                    <li>
                                        <a className={cx('resource-btn')}>System status</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={cx('contact')}>
                        <div className={cx('social')}>
                            <h2>KEEP IN TOUCH</h2>
                            <Tippy content="Facebook" placement="bottom">
                                <FontAwesomeIcon
                                    className={cx('social-icon')}
                                    icon={faFacebook}
                                    onClick={() => window.open('https://facebook.com/vanphuc2401', '_blank')}
                                />
                            </Tippy>
                            <Tippy content="Twitter" placement="bottom">
                                <FontAwesomeIcon className={cx('social-icon')} icon={faTwitter} />
                            </Tippy>
                            <Tippy content="Instagram" placement="bottom">
                                <FontAwesomeIcon className={cx('social-icon')} icon={faInstagram} />
                            </Tippy>
                            <Tippy content="Whatsapp" placement="bottom">
                                <FontAwesomeIcon className={cx('social-icon')} icon={faWhatsapp} />
                            </Tippy>
                        </div>
                        <div className={cx('contact-info')}>
                            <h2>CONTACT INFORMATION</h2>
                            <h4>Phone: 0788996877</h4>
                        </div>
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
                                <a href="/feedback">Feedback</a>
                            </li>
                            <li>
                                <a href="/helps">Help</a>
                            </li>
                            <li>
                                <a href="/faq">FAQs</a>
                            </li>
                            <li>
                                <a href="/rss-channels">RSS</a>
                            </li>
                            <li>
                                <a href="/terms/vi_term">Terms</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
