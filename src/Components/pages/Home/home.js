import { useEffect, useState } from 'react';
import StickyBox from 'react-sticky-box';

import * as apiService from '../../../services/apiService';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Image from '../../Image/image';
import { Link } from 'react-router-dom';
import Pagination from '../../Pagination/pagination';
import config from '../../../config';
import Sidebar from '../../../layouts/components/Sidebar/sidebar';
import BlogItem from '../../BlogItem/blogItem';
const cx = classNames.bind(styles);

function Home() {
    const [searchBlogResult, setSearchBlogResult] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isFetched, setIsFetch] = useState(false);

    useEffect(() => {
        const fetchAPI = async () => {
            const resBlog = await apiService.fetch(config.path.GET_ALL_BLOG, {
                params: {
                    page: currentPage - 1,
                    size: 10,
                    sort: 'createdAt,desc',
                },
            });
            setTotalPages(resBlog.totalPages);
            setSearchBlogResult(resBlog.content);
            setIsFetch(true);
        };

        fetchAPI();
    }, [currentPage]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                {isFetched && <h2 className={cx('title')}>THE NEWEST BLOGS</h2>}
                {searchBlogResult.map((blogItem) => (
                    <BlogItem className={cx('blog-item')} data={blogItem} />
                ))}
                {isFetched && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(number) => setCurrentPage(number)}
                    />
                )}
            </div>
            {isFetched && (
                <div className={cx('sidebar')}>
                    <StickyBox offsetTop={90}>
                        <Sidebar />
                    </StickyBox>
                </div>
            )}
        </div>
    );
}

export default Home;
