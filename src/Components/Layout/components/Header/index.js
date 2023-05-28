import { useEffect, useState } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo, faMagnifyingGlass, faRightToBracket, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark, faBell, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import images from '../../../../asset/images';
import { Wrapper as PopperWrapper } from '../../../Popper';
import Button from '../../../Button';
import InfoItem from '../../../InfoItem';
import Menu from '../../../Popper/Menu';

import { LOGGED_MENU_ITEMS, UNLOGGED_MENU_ITEMS } from './Utils';
import Image from '../../../Image';
import Search from '../Search';

const cx = classNames.bind(styles);

function Header() {
    //test
    const [currentUser, setCurrentUser] = useState(false);

    // Handle logic
    const handleSignin = () => {
        setCurrentUser(true);
        console.log(currentUser);
    };
    const handleSignOut = () => {
        setCurrentUser(false);
    };
    const handleMenuChange = (menuItem) => {
        switch (menuItem.title) {
            case 'Sign out':
                setCurrentUser(false);

                break;
        }
        console.log(currentUser);
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('header-menu')}>
                    <img className={cx('logo')} src={images.logo} alt="PLog" />
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
                            <Button type="text" size="icon-btn" leftIcon={<FontAwesomeIcon icon={faInfo} />}></Button>
                        </span>
                    </HeadlessTippy>
                    {currentUser && (
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
                    {!currentUser && (
                        <div className={cx('action')}>
                            <div>
                                <Button
                                    className={cx('large')}
                                    leftIcon={<FontAwesomeIcon icon={faRightToBracket} />}
                                    onClick={handleSignin}
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
