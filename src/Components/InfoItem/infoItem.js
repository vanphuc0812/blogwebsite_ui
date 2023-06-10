import classNames from 'classnames/bind';
import styles from './InfoItem.module.scss';

const cx = classNames.bind(styles);
function InfoItem({ title, time }) {
    return (
        <div className={cx('wrapper')}>
            <h4 className={cx('title')}>{title}</h4>
            <p className={cx('time')}>{time}</p>
        </div>
    );
}

export default InfoItem;
