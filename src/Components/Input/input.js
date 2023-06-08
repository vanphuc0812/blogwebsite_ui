import classNames from 'classnames/bind';

import styles from './Input.module.scss';

const cx = classNames.bind(styles);

function Input({ className, leftIcon, rightIcon, children, onChange, ...passProps }) {
    const classes = cx('wrapper', { [className]: className });

    return (
        <div className={classes}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <input {...passProps} onChange={onChange} />
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </div>
    );
}

export default Input;
