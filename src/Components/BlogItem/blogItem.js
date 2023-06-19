import classNames from 'classnames/bind';
import styles from './BlogItem.module.scss';
import { Link } from 'react-router-dom';
import config from '../../config';
import Image from '../Image/image';

const cx = classNames.bind(styles);

function BlogItem({ data, avatar = true, type, className }) {
    const classes = cx('wrapper', type, { [className]: className });
    return (
        // <Link to={`/blog/${encodeURIComponent(data.transliterated)}/${data.id}`} className={cx('wrapper')}>
        <div key={data.id} className={classes}>
            {avatar && (
                <Image
                    to={'/blogger/' + data.user.username}
                    className={cx('avatar')}
                    src={process.env.REACT_APP_BASE_URL + config.path.FILE_STORAGE + data.user.avatar}
                />
            )}
            <div className={cx('info')}>
                <a href={'/blogger/' + data.user.username} className={cx('author')}>
                    {data.user.name}
                </a>
                <span className={cx('post-date')}>đăng vào lúc {data.createdAt}</span>

                <Link to={`/blog/${encodeURIComponent(data.transliterated)}/${data.id}`}>
                    <h4 className={cx('blog-title')}>{data.title}</h4>
                    <p className={cx('short-content')}>{data.shortContent.slice(0, 200) + '...'}</p>
                </Link>
            </div>
        </div>
        // </Link>
    );
}

export default BlogItem;
