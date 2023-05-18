import classNames from 'classnames/bind';
import styles from './BlogItem.module.scss';

const cx = classNames.bind(styles);

function BlogItem({ title, author, postDate, content }) {
    return (
        <div className={cx('wrapper')}>
            <h4 className={cx('title')}>{title}</h4>
            <div className={cx('info')}>
                <a className={cx('author')}>{author}</a>
                <p className={cx('post-date')}>dang vao luc {postDate}</p>
            </div>
            <p className={cx('content')}>{content}</p>
        </div>
    );
}

export default BlogItem;
