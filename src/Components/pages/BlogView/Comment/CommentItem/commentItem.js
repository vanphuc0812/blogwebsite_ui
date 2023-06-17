import config from '../../../../../config';
import Image from '../../../../Image/image';
import classNames from 'classnames/bind';

import styles from './CommentItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
function CommentItem({ comment, className }) {
    const handleReply = (e) => {
        console.log(e.target.id);
    };
    const classes = cx('wrapper', { [className]: className });

    return (
        <div className={classes}>
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
                <button id={comment.id} className={cx('reply-btn')} onClick={handleReply}>
                    Reply
                </button>
            </div>
        </div>
    );
}

export default CommentItem;
