import HeadlessTippy from '@tippyjs/react/headless';
import { useEffect, useState, useRef } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { Wrapper as PopperWrapper } from '../../../Popper';
import BlogItem from '../../../BlogItem';
import Button from '../../../Button';

const cx = classNames.bind(styles);
function Search() {
    const [searchResult, setSearchResult] = useState([]);
    const [searchInputValue, setSearchInputValue] = useState('');
    const [showResult, setShowResult] = useState(true);

    const inputRef = useRef();

    useEffect(() => {
        fetch('https://tiktok.fullstack.edu.vn/api/users/search?q=hoaa&type=less')
            .then((res) => res.json())
            .then((res) => setSearchResult(res.data));
    }, []);

    const handleClear = () => {
        setSearchInputValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    return (
        <div className={cx('search', 'small')}>
            <HeadlessTippy
                interactive
                onClickOutside={handleHideResult}
                visible={showResult && searchResult.length > 0}
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
                <span>
                    <input
                        ref={inputRef}
                        value={searchInputValue}
                        placeholder="Tìm kiếm"
                        spellCheck={false}
                        onChange={(e) => {
                            setSearchInputValue(e.target.value);
                        }}
                        onFocus={() => setShowResult(true)}
                    />
                </span>
            </HeadlessTippy>

            {!!searchInputValue && (
                <Button
                    type="text"
                    size="icon-btn"
                    leftIcon={<FontAwesomeIcon icon={faCircleXmark} />}
                    className={cx('clear-btn')}
                    onClick={handleClear}
                ></Button>
            )}

            {/* <FontAwesomeIcon className={cx('loading')} icon={faSpinner} spin /> */}
            <button className={cx('search-btn')}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
        </div>
    );
}

export default Search;
