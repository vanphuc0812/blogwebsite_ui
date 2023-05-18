import classNames from 'classnames/bind';
import styles from './BlogItem.module.scss';

const cx = classNames.bind(styles);
function InfoItem({ title, postTime }) {
    return (
        <div className={cx('wrapper')}>
            <h4 className={cx('title')}>{title}</h4>
            <p className={cx('time')}>{postTime}</p>
        </div>
    );
}

export default InfoItem;
