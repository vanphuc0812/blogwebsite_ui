import { useState } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo, faMagnifyingGlass, faRightToBracket, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { faBell, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import images from '../../../asset/images';
import { Wrapper as PopperWrapper } from '../../../Components/Popper';
import Button from '../../../Components/Button';
import InfoItem from '../../../Components/InfoItem';
import Menu from '../../../Components/Popper/Menu';

import { LOGGED_MENU_ITEMS, UNLOGGED_MENU_ITEMS } from './Utils';
import Image from '../../../Components/Image';
import Search from '../Search';
import { Link } from 'react-router-dom';
import config from '../../../config';
import { action, useStore } from '../../../storage';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

function Header() {
    //test
    const [store, dispatch] = useStore();
    var currentUser = store.loggedUser;
    console.log(currentUser);

    // Handle logic
    const handleSignin = () => {};

    const handleMenuChange = (menuItem) => {
        switch (menuItem.title) {
            case 'Sign out':
                dispatch(action.setLoggedUser({}));
                break;
            default:
                //do nothing
                break;
        }
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('header-menu')}>
                    <Link to={config.routes.home}>
                        <img className={cx('logo')} src={images.logo} alt="PLog" />
                    </Link>
                    <div className={cx('medium')}>
                        <Button size="small" type="text">
                            Bài viết
                        </Button>
                        <Button size="small" type="text">
                            Hỏi đáp
                        </Button>
                        <Button size="small" type="text">
                            Thảo luận
                        </Button>
                    </div>
                </div>

                <Search />

                <div className={cx('action')}>
                    <Button
                        size="icon-btn"
                        leftIcon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
                        type="text"
                        className={cx('un-small')}
                    ></Button>
                    <div>
                        <HeadlessTippy
                            interactive
                            render={(attr) => (
                                <PopperWrapper>
                                    <div className={cx('info-header')}>
                                        <h3>Thông tin</h3>
                                        <button className={cx('mark-seen-btn')}>Đánh dấu là đã đọc</button>
                                    </div>
                                    <div className={cx('list-info')}>
                                        <InfoItem
                                            title={'🔔 Sự kiện May Fest 2023 chính thức diễn ra từ hôm nay! 🔔'}
                                            time={'thg 4 1, 12:00 SA'}
                                        ></InfoItem>
                                        <InfoItem
                                            title={'Công bố thể lệ chính thức Viblo May Fest 2023 🏆️✨'}
                                            time={'thg 4 1, 12:00 SA'}
                                        ></InfoItem>
                                    </div>
                                    <div className={cx('info-footer')}>
                                        <button className={cx('all-info-btn')}>Tất cả thông tin</button>
                                    </div>
                                </PopperWrapper>
                            )}
                        >
                            <span>
                                <Button
                                    type="text"
                                    size="icon-btn"
                                    leftIcon={<FontAwesomeIcon icon={faInfo} />}
                                ></Button>
                            </span>
                        </HeadlessTippy>
                    </div>
                    {Object.keys(currentUser).length !== 0 && (
                        <div className={cx('action')}>
                            <Tippy content="Notification" placement="bottom">
                                <span>
                                    <Button
                                        type="text"
                                        size="icon-btn"
                                        leftIcon={<FontAwesomeIcon icon={faBell} />}
                                    ></Button>
                                </span>
                            </Tippy>
                            <Tippy content="Writes" placement="bottom">
                                <span>
                                    <Button
                                        type="text"
                                        size="icon-btn"
                                        leftIcon={<FontAwesomeIcon icon={faPenToSquare} />}
                                    ></Button>
                                </span>
                            </Tippy>
                            <Menu items={LOGGED_MENU_ITEMS} onchange={handleMenuChange}>
                                <Image
                                    className={cx('avatar')}
                                    src="https://w0.peakpx.com/wallpaper/549/987/HD-wallpaper-ssj3-goku-ball-dragon-super.jpg"
                                    alt="avatar"
                                ></Image>
                            </Menu>
                        </div>
                    )}
                    {Object.keys(currentUser).length === 0 && (
                        <div className={cx('action')}>
                            <div>
                                <Button
                                    to={'/auth/login'}
                                    className={cx('large')}
                                    leftIcon={<FontAwesomeIcon icon={faRightToBracket} />}
                                    // onClick={handleSignin}
                                >
                                    Đăng nhập/Đăng ký
                                </Button>
                                <Button
                                    className={cx('un-large')}
                                    size="icon-btn"
                                    type="text"
                                    leftIcon={<FontAwesomeIcon icon={faRightToBracket} />}
                                    onClick={handleSignin}
                                ></Button>
                            </div>
                            <Menu items={UNLOGGED_MENU_ITEMS}>
                                <span>
                                    <Button
                                        className={cx('unlogin-menu-btn')}
                                        type="text"
                                        size="icon-btn"
                                        leftIcon={<FontAwesomeIcon icon={faEllipsisVertical} />}
                                    ></Button>
                                </span>
                            </Menu>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
