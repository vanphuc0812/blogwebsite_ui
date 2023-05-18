import { useEffect, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faSpinner, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { faInfo } from '@fortawesome/free-solid-svg-icons';

import { faCircleXmark, faBell, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import images from '../../../../asset/images';
import { Wrapper as PopperWrapper } from '../../../Popper';
import BlogItem from '../../../BlogItem';

const cx = classNames.bind(styles);

function Header() {
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setSearchResult([1, 2, 3]);
        }, 100);
    }, []);

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <img height={40} width={50} src={images.logo} alt="PLog" />
                </div>
                <div className={cx('header-menu')}>
                    <div className={cx('menu-button')}>Bài viết</div>
                    <div className={cx('menu-button')}>Hỏi đáp</div>
                    <div className={cx('menu-button')}>Thảo luận</div>
                </div>
                <div className={cx('search')}>
                    <Tippy
                        interactive
                        visible={searchResult.length > 0}
                        render={(attr) => (
                            <div className={cx('search-result')}>
                                <PopperWrapper>
                                    <h3 className={cx('search-label')}>Bài viết</h3>
                                    <BlogItem
                                        title={'Bai viet so 1'}
                                        author={'Huynh Van Phuc'}
                                        postDate={20202102}
                                        content={'asdjfasjdflajdlfjasldfjlasdkfjlasdjfladjflajdsfl'}
                                    />
                                    <BlogItem
                                        title={'Bai viet so 2'}
                                        author={'Huynh Van Phuc'}
                                        postDate={20202102}
                                        content={'asdjfasjdflajdlfjasldfjlasdkfjlasdjfladjflajdsfl'}
                                    />
                                    <h3 className={cx('search-label')}>Hỏi đáp</h3>
                                </PopperWrapper>
                            </div>
                        )}
                    >
                        <input placeholder="Tìm kiếm" spellCheck={false} />
                    </Tippy>
                    <button className={cx('clear')}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                    {/* <FontAwesomeIcon className={cx('loading')} icon={faSpinner} spin /> */}
                    <button className={cx('search-btn')}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>
                <div className={cx('action')}>
                    <Tippy
                        interactive
                        render={(attr) => (
                            <div className={cx('info-result')}>
                                <PopperWrapper>
                                    <div className={cx('info-header')}>
                                        <h3>Thông tin</h3>
                                        <button className={cx('mark-seen-btn')}>Đánh dấu là đã đọc</button>
                                    </div>
                                    <div className={cx('list-info')}></div>
                                </PopperWrapper>
                            </div>
                        )}
                    >
                        <button className={cx('info')}>
                            <FontAwesomeIcon icon={faInfo} />
                        </button>
                    </Tippy>
                    <button className={cx('noti')}>
                        <FontAwesomeIcon icon={faBell} />
                    </button>
                    <button className={cx('write')}>
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    <div className={cx('login-register')}>
                        <FontAwesomeIcon icon={faRightToBracket} />
                        <p>Đăng nhập/Đăng ký</p>
                    </div>
                    <div className={cx('avatar')}>
                        <img
                            src="https://w0.peakpx.com/wallpaper/549/987/HD-wallpaper-ssj3-goku-ball-dragon-super.jpg"
                            alt="avatar"
                        ></img>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
