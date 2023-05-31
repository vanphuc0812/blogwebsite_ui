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
    const [loading, setLoading] = useState(false);

    const inputRef = useRef();

    useEffect(() => {
        if (!searchInputValue.trim()) {
            setSearchResult([]);
            return;
        }
        setLoading(true);
        fetch(
            `http://localhost:8080/BlogsManagement/SearchBlogs?keyword=${encodeURIComponent(
                searchInputValue,
            )}&type=less`,
        )
            .then((res) => res.json())
            .then((res) => {
                setSearchResult(res.content);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [searchInputValue]);

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
                            {searchResult.map((searchItem) => (
                                <BlogItem key={searchItem.id} data={searchItem} />
                            ))}
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
            {!!searchInputValue && !loading && (
                <Button
                    type="text"
                    size="icon-btn"
                    leftIcon={<FontAwesomeIcon icon={faCircleXmark} />}
                    className={cx('clear-btn')}
                    onClick={handleClear}
                />
            )}
            {loading && (
                <Button
                    className={cx('loading')}
                    type="text"
                    size="icon-btn"
                    leftIcon={<FontAwesomeIcon icon={faSpinner} spin />}
                />
            )}
            <button className={cx('search-btn')}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
        </div>
    );
}

export default Search;
