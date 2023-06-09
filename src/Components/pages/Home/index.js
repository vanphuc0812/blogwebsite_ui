import { useEffect, useState } from 'react';
import * as apiService from '../../../services/apiService';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Image from '../../Image';
import { Link } from 'react-router-dom';
import Pagination from '../../Pagination/pagination';
import config from '../../../config';
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
                    sort: 'createdAt',
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
            {isFetched && <h2 className={cx('title')}>THE NEWEST BLOGS</h2>}
            {searchBlogResult.map((blogItem) => (
                <div key={blogItem.id} className={cx('blog-item-wrapper')}>
                    <Image
                        to={'/blog/' + blogItem.user.username}
                        className={cx('avatar')}
                        src={process.env.REACT_APP_BASE_URL + 'api/files/' + blogItem.user.avatar}
                    ></Image>
                    <div className={cx('info')}>
                        <a href={'/blogItemger/' + blogItem.user.username} className={cx('author')}>
                            {blogItem.user.name}
                            <span className={cx('post-date')}>đăng vào lúc {blogItem.createdAt}</span>
                        </a>
                        <Link to={`/blogItem/${blogItem.transliterated}`}>
                            <h4 className={cx('blog-title')}>{blogItem.title}</h4>
                        </Link>
                        <p className={cx('content')}>{blogItem.shortContent.slice(0, 200) + '...'}</p>
                    </div>
                </div>
            ))}
            {isFetched && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(number) => setCurrentPage(number)}
                />
            )}
        </div>
    );
}

export default Home;
