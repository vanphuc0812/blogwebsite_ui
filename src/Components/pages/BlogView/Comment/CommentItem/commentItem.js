import config from '../../../../../config';
import Image from '../../../../Image/image';
import classNames from 'classnames/bind';

import styles from './CommentItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
function CommentItem({ comment }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('author-info')}>
                <Image
                    to={'/blogger/' + comment.user.username}
                    className={cx('avatar')}
                    src={process.env.REACT_APP_BASE_URL + config.path.FILE_STORAGE + comment.user.avatar}
                />
                <a href={'/blogger/' + comment.user.username} className={cx('author-name')}>
                    {comment.user.name}
                </a>
                <span className={cx('author-username')}>@{comment.user.username}</span>
            </div>
            <p className={cx('content')}>{comment.content}</p>
            <div className={cx('option-bar')}>
                <FontAwesomeIcon icon={faChevronUp}></FontAwesomeIcon>
                <span>{comment.likes}</span>
                <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>
                <button className={cx('reply-btn')}>Reply</button>
            </div>
        </div>
    );
}

export default CommentItem;
