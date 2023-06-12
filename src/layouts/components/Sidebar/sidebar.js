import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

function Sidebar({ className }) {
    const classes = cx('wrapper', { [className]: className });

    return (
        <aside className={classes}>
            <div className={cx('section')}>
                <div className={cx('section-title')}>
                    <h3>TABLE OF CONTENT</h3>
                    <hr />
                </div>
            </div>
            <div className={cx('section')}>
                <div className={cx('section-title')}>
                    <h3>BEST BLOGER</h3>
                    <hr />
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;