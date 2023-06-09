import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

function Sidebar({ className }) {
    const classes = cx('wrapper', { [className]: className });

    return (
        <aside className={classes}>
            <h2 className={cx('title')}>BEST BLOGER</h2>
        </aside>
    );
}

export default Sidebar;
