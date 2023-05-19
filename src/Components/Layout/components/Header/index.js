import { useEffect, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMagnifyingGlass,
    faSpinner,
    faRightToBracket,
    faUser,
    faFileLines,
    faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { faInfo } from '@fortawesome/free-solid-svg-icons';

import { faCircleXmark, faBell, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import images from '../../../../asset/images';
import { Wrapper as PopperWrapper } from '../../../Popper';
import BlogItem from '../../../BlogItem';
import Button from '../../../Button';
import InfoItem from '../../../InfoItem';
import Menu from '../../../Popper/Menu';

const cx = classNames.bind(styles);
const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'Profile',
        to: '/user',
    },
    {
        icon: <FontAwesomeIcon icon={faFileLines} />,
        title: 'My content',
    },
    {
        icon: <FontAwesomeIcon icon={faTimes} />,
        title: 'My',
    },
];

function Header() {
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setSearchResult([]);
        }, 100);
    }, []);

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <img height={40} width={50} src={images.logo} alt="PLog" />
                </div>
                <div className={cx('header-menu')}>
                    <Button type="text">Bài viết</Button>
                    <Button type="text">Hỏi đáp</Button>
                    <Button type="text">Thảo luận</Button>
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
                                        title={'Java collections: sắp xếp collections'}
                                        author={'Huynh Van Phuc'}
                                        postDate={'thg 3 5, 2017 2:58 CH'}
                                        content={
                                            'Thực ra việc sắp xếp trong collection của java là một vấn đề rất cũ, nhưng thường trong các câu hỏi phỏng vấn về java ứng viên rất hay bị hỏi về vấn đề này. Vì vậy mình mong post này sẽ giúp được một số ứng viên chẳng may bị hỏi đến lúc phỏng vấn 😄. Lớp Collections cung cấp các phương thức tĩnh(static) cho việc sắp xếp các phần tử của collection. Chúng ta có thể sắp xếp các phần tử của:'
                                        }
                                    />
                                    <BlogItem
                                        title={'Làm thế nào để chạy shell script trong Java?'}
                                        author={'Huynh Van Phuc'}
                                        postDate={'thg 2 16, 2019 3:26 CH'}
                                        content={
                                            'Trong thực tế nhiều khi chương trình Java của bạn sẽ phải gọi đến shell script của hệ điều hành (Window, Linux) để thực hiện một số các tác vụ đặc biệt nào đó. Ví dụ như khi ứng dụng của bạn thực hiện một nghiệp vụ và sau đó phải gọi đến 1 shell script để import dữ liệu vào DB chẳng hạn.... Bài viết này sẽ giới thiệu cách thức để chúng ta có thể chạy shell script trong Java.'
                                        }
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
                            <Button type="text" size="icon">
                                <FontAwesomeIcon icon={faInfo} />
                            </Button>
                        </span>
                    </Tippy>
                    <span>
                        <Button type="text" size="icon">
                            <FontAwesomeIcon icon={faBell} />
                        </Button>
                    </span>
                    <span>
                        <Button type="text" size="icon">
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </Button>
                    </span>
                    <Button type="text" leftIcon={<FontAwesomeIcon icon={faRightToBracket} />}>
                        Đăng nhập/Đăng ký
                    </Button>

                    <Menu items={MENU_ITEMS}>
                        <div className={cx('avatar')}>
                            <img
                                src="https://w0.peakpx.com/wallpaper/549/987/HD-wallpaper-ssj3-goku-ball-dragon-super.jpg"
                                alt="avatar"
                            ></img>
                        </div>
                    </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
