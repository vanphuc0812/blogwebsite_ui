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
import Button from '../../../Components/Button/button';
import InfoItem from '../../../Components/InfoItem/infoItem';
import Menu from '../../../Components/Popper/Menu';

import { LOGGED_MENU_ITEMS, UNLOGGED_MENU_ITEMS } from './Utils';
import Image from '../../../Components/Image/image';
import Search from '../Search/search';
import { Link, useNavigate } from 'react-router-dom';
import config from '../../../config';
import { action, useStore } from '../../../storage';

const cx = classNames.bind(styles);

function Header() {
    const [store, dispatch] = useStore();
    const navigate = useNavigate();
    var currentUser = Object.keys(store).length !== 0 ? store.loggedUser : false;

    // Handle logic
    const handleMenuChange = (menuItem) => {
        switch (menuItem.title) {
            case 'Profile':
                navigate(`/blogger/${currentUser.username}`);
                break;
            case 'Sign out':
                dispatch(action.removeLoggedUser());

                break;
            default:
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
                        <Button size="medium" type="text" to="/">
                            Posts
                        </Button>
                        <Button size="medium" type="text">
                            Questions
                        </Button>
                        <Button size="medium" type="text">
                            Discussions
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
                                        <h3>Information</h3>
                                        <button className={cx('mark-seen-btn')}>Mark all as read</button>
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
                                        <button className={cx('all-info-btn')}>All information</button>
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
                                <Link to={config.routes.write}>
                                    <Button
                                        type="text"
                                        size="icon-btn"
                                        leftIcon={<FontAwesomeIcon icon={faPenToSquare} />}
                                    ></Button>
                                </Link>
                            </Tippy>
                            <Menu items={LOGGED_MENU_ITEMS} onchange={handleMenuChange}>
                                <Image
                                    className={cx('avatar')}
                                    src={process.env.REACT_APP_BASE_URL + config.path.FILE_STORAGE + currentUser.avatar}
                                    alt="avatar"
                                ></Image>
                            </Menu>
                        </div>
                    )}
                    {!currentUser && (
                        <div className={cx('action')}>
                            <div>
                                <Button
                                    to={config.routes.login}
                                    className={cx('large')}
                                    size="large"
                                    leftIcon={<FontAwesomeIcon icon={faRightToBracket} />}
                                >
                                    Login/Register
                                </Button>
                                <Button
                                    className={cx('un-large')}
                                    size="icon-btn"
                                    type="text"
                                    leftIcon={<FontAwesomeIcon icon={faRightToBracket} />}
                                    to={config.routes.login}
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
