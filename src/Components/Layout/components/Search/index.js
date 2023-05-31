import HeadlessTippy from '@tippyjs/react/headless';
import { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import classNames from 'classnames/bind';

import { useDebounce } from '../../../../hooks';
import * as searchService from '../../../../apiService/searchService';
import styles from './Search.module.scss';
import { Wrapper as PopperWrapper } from '../../../Popper';
import BlogItem from '../../../BlogItem';
import Button from '../../../Button';

const cx = classNames.bind(styles);
function Search() {
    const [searchBlogResult, setSearchBlogResult] = useState([]);
    const [searchQuestionResult, setSearchQuestionResult] = useState([]);
    const [searchAuthorResult, setSearchAuthor] = useState([]);

    const [searchInputValue, setSearchInputValue] = useState('');
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const debounced = useDebounce(searchInputValue, 800);

    const inputRef = useRef();

    useEffect(() => {
        if (!debounced.trim()) {
            setSearchBlogResult([]);
            return;
        }
        setLoading(true);

        const fetchAPI = async () => {
            setLoading(true);
            const res = await searchService.search(debounced);
            setSearchBlogResult(res);
            setLoading(false);
        };

        fetchAPI();
    }, [debounced]);

    const handleClear = () => {
        setSearchInputValue('');
        setSearchBlogResult([]);
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
                    visible={
                        showResult && searchBlogResult.length > 0 // ||
                    }
                    render={(attr) => (
                        <div className={cx('search-result')}>
                            <PopperWrapper>
                                {searchBlogResult.length > 0 && (
                                    <div className={cx('blogpost-search-result')}>
                                        <h3 className={cx('search-label')}>Bài viết</h3>
                                        {searchBlogResult.map((searchItem) => (
                                            <BlogItem key={searchItem.id} data={searchItem} />
                                        ))}
                                    </div>
                                )}

                                {searchAuthorResult.length > 0 && (
                                    <div className={cx('author-search-result')}>
                                        <h3 className={cx('search-label')}>Tác giả</h3>
                                        {searchAuthorResult.map((searchItem) => (
                                            <BlogItem key={searchItem.id} data={searchItem} />
                                        ))}
                                    </div>
                                )}

                                {searchQuestionResult.length > 0 && (
                                    <div className={cx('question-search-result')}>
                                        <h3 className={cx('search-label')}>Hỏi đáp</h3>
                                        {searchQuestionResult.map((searchItem) => (
                                            <BlogItem key={searchItem.id} data={searchItem} />
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
