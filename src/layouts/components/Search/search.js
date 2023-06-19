import HeadlessTippy from '@tippyjs/react/headless';
import { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import classNames from 'classnames/bind';

import { useDebounce } from '../../../hooks';
import * as apiService from '../../../services/apiService';
import styles from './Search.module.scss';
import { Wrapper as PopperWrapper } from '../../../Components/Popper';
import BlogItem from '../../../Components/BlogItem/blogItem';
import Button from '../../../Components/Button/button';
import BloggerItem from '../../../Components/BloggerItem/bloggerItem';
import config from '../../../config';

const cx = classNames.bind(styles);
function Search() {
    const [searchBlogResult, setSearchBlogResult] = useState([]);
    const [searchAuthorResult, setSearchAuthorResult] = useState([]);

    const [searchInputValue, setSearchInputValue] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);

    const debouncedValue = useDebounce(encodeURIComponent(searchInputValue), 800);

    const inputRef = useRef();

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchBlogResult([]);
            setSearchAuthorResult([]);
            return;
        }
        setLoading(true);

        const fetchAPI = async () => {
            setLoading(true);
            const resBlog = await apiService.search(config.path.SEARCH_BLOG, debouncedValue);
            const resAuthor = await apiService.search(config.path.SEARCH_USER, debouncedValue);
            setSearchBlogResult(resBlog);
            setSearchAuthorResult(resAuthor);
            setLoading(false);
        };

        fetchAPI();
    }, [debouncedValue]);

    const handleClear = () => {
        setSearchInputValue('');
        setSearchBlogResult([]);
        setSearchAuthorResult([]);
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    return (
        <div className={cx('search', 'small')}>
            {/* Interactive tippy element may not be accessible via keyboard navigation because it is not directly after the reference element in the DOM source order. Using a wrapper <div> or <span> tag around the reference element solves this by creating a new parentNode context.  */}
            <div>
                <HeadlessTippy
                    interactive
                    onClickOutside={handleHideResult}
                    visible={showResult && (searchBlogResult.length > 0 || searchAuthorResult.length > 0)}
                    render={(attr) => (
                        <div className={cx('search-result')}>
                            <PopperWrapper>
                                {searchBlogResult.length > 0 && (
                                    <div className={cx('blogpost-search-result')}>
                                        <h3 className={cx('search-label')}>Bài viết</h3>
                                        {searchBlogResult.map((item) => (
                                            <BlogItem key={item.id} data={item} avatar={false} type="popup-item" />
                                        ))}
                                    </div>
                                )}
                                {searchAuthorResult.length > 0 && (
                                    <div className={cx('author-search-result')}>
                                        <h3 className={cx('search-label')}>Tác giả</h3>
                                        {searchAuthorResult.map((item) => (
                                            <BloggerItem key={item.id} data={item} />
                                        ))}
                                    </div>
                                )}
                            </PopperWrapper>
                        </div>
                    )}
                >
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
                </HeadlessTippy>
            </div>
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
