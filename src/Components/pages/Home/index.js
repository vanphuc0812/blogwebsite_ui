import { useEffect } from 'react';
import { useState } from 'react';
import * as apiService from '../../../services/apiService';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Image from '../../Image';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Home() {
    const [searchBlogResult, setSearchBlogResult] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            const resBlog = await apiService.fetchAll('BlogsManagement/GetAllBlogs');
            setSearchBlogResult(resBlog);
        };

        fetchAPI();
    }, []);

    return (
        <div>
            {searchBlogResult.map((blogItem) => (
                <div key={blogItem.id} className={cx('blog-item-wrapper')}>
                    <Image
                        to={'/blogItemger/' + blogItem.user.username}
                        className={cx('avatar')}
                        src={process.env.REACT_APP_BASE_URL + 'api/files/' + blogItem.user.avatar}
                    ></Image>
                    <div className={cx('info')}>
                        <a href={'/blogItemger/' + blogItem.user.username} className={cx('author')}>
                            {blogItem.user.name}
                            <span className={cx('post-date')}>đăng vào lúc {blogItem.createdAt}</span>
                        </a>
                        <Link to={`/blogItem/${blogItem.transliterated}`}>
                            <h4 className={cx('title')}>{blogItem.title}</h4>
                        </Link>
                        <p className={cx('content')}>{blogItem.shortContent.slice(0, 200) + '...'}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Home;
