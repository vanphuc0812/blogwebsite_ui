import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './Loading.module.scss';

const cx = classNames.bind(styles);

function Loading() {
    return <FontAwesomeIcon className={cx('loading-icon')} icon={faSpinner} spin></FontAwesomeIcon>;
}

export default Loading;
