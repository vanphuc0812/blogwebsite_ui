import classNames from 'classnames/bind';
import styles from './Blogger.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Blogger({ data }) {
    return (
        <Link to={`/author/@${data.username}`} className={cx('wrapper')}>
            <div className={cx('name')}>
                <h4 className={cx('authorName')}>
                    {data.name}
                    <span className={cx('username')}>@{data.username}</span>
                </h4>
            </div>
            <p className={cx('writes')}>số bài viết: 0</p>
        </Link>
    );
}

export default Blogger;
