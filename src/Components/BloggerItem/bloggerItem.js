import classNames from 'classnames/bind';
import styles from './BloggerItem.module.scss';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import config from '../../config';
import * as apiService from '../../services/apiService';
import Image from '../Image/image';
const cx = classNames.bind(styles);

function Blogger({ data, username, avatar = false }) {
    const [isFetching, setIsFetching] = useState(true);
    const [blogger, setBlogger] = useState({});
    useEffect(() => {
        if (username) {
            const fetchAPI = async () => {
                setIsFetching(true);

                const resUser = await apiService.fetch(config.path.GET_USER_BY_USERNAME, {
                    params: {
                        username: username,
                    },
                });
                setIsFetching(false);

                setBlogger(resUser);
            };

            fetchAPI();
        } else {
            setBlogger(data);
        }
    }, [username]);

    return (
        <div>
            {!isFetching && (
                <div className={cx('wrapper')}>
                    {avatar && (
                        <Image
                            to={'/blogger/' + blogger.username}
                            className={cx('avatar')}
                            src={process.env.REACT_APP_BASE_URL + config.path.FILE_STORAGE + blogger.avatar}
                        />
                    )}
                    <Link to={`/author/@${blogger.username}`} className={cx('info')}>
                        <div className={cx('name')}>
                            <h4 className={cx('authorName')}>
                                {blogger.name}
                                <span className={cx('username')}>@{blogger.username}</span>
                            </h4>
                        </div>
                        <p className={cx('writes')}>số bài viết: 0</p>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default Blogger;
