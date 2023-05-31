import classNames from 'classnames/bind';
import styles from './BlogItem.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function BlogItem({ data }) {
    return (
        <Link to={`/blog/${data.transliterated}`} className={cx('wrapper')}>
            <h4 className={cx('title')}>{data.title}</h4>
            <div className={cx('info')}>
                <span className={cx('author')}>{data.user.name}</span>
                <p className={cx('post-date')}>dang vao luc {data.createdAt}</p>
            </div>
            <p className={cx('content')}>{data.shortContent}</p>
        </Link>
    );
}

export default BlogItem;
