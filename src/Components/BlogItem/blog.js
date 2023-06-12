import classNames from 'classnames/bind';
import styles from './BlogItem.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function BlogItem({ data }) {
    return (
        <Link to={`/blog/${encodeURIComponent(data.transliterated)}/${data.id}`} className={cx('wrapper')}>
            <h4 className={cx('title')}>{data.title}</h4>
            <div className={cx('info')}>
                <p className={cx('author')}>
                    {data.user.name}
                    <span className={cx('post-date')}>đăng vào lúc {data.createdAt}</span>
                </p>
            </div>
            <p className={cx('content')}>{data.shortContent}</p>
        </Link>
    );
}

export default BlogItem;
