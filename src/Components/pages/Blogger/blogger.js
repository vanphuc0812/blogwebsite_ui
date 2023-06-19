import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import StickyBox from 'react-sticky-box';

import * as apiService from '../../../services/apiService';
import classNames from 'classnames/bind';
import styles from './Blogger.module.scss';
import Image from '../../Image/image';
import { Link } from 'react-router-dom';
import Pagination from '../../Pagination/pagination';
import config from '../../../config';
import Sidebar from '../../../layouts/components/Sidebar/sidebar';
import Button from '../../Button/button';
import * as plogToast from '../../../utils/toast';
import { useStore } from '../../../storage';
import BlogItem from '../../BlogItem/blogItem';
import BloggerItem from '../../BloggerItem/bloggerItem';

const cx = classNames.bind(styles);

function Blogger() {
    const { username } = useParams();
    document.title = username;

    const [blogger, setBlogger] = useState({});
    const [blogs, setBlogs] = useState({});

    const [store, dispatch] = useStore();
    var loggedUser = Object.keys(store).length !== 0 ? store.loggedUser : false;

    const [isFollowed, setIsFollowed] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [content, setContent] = useState('posts');

    useEffect(() => {
        const fetchAPI = async () => {
            setIsFetching(true);
            const resUser = await apiService.fetch(config.path.GET_USER_BY_USERNAME, {
                params: {
                    username: username,
                },
            });
            const resBlogs = await apiService.fetch(config.path.GET_BLOGS_BY_USERNAME, {
                params: {
                    username: username,
                },
            });

            setIsFetching(false);
            setBlogger(resUser);
            setBlogs(resBlogs);
        };
        fetchAPI();
    }, [username]);

    useEffect(() => {
        if (
            loggedUser &&
            loggedUser.following.filter((username) => {
                return username === blogger.username;
            }).length > 0
        )
            setIsFollowed(true);
    }, [loggedUser, blogger]);

    const handleFollowButton = () => {
        if (!isFollowed) {
            const fetchAPI = async () => {
                const res = await apiService.followUser(loggedUser.username, blogger.username);
                if (res.errors.length > 0) {
                    plogToast.error('Can not follow this blogger due to: ' + res.error);
                } else {
                    setIsFollowed(true);
                }
            };

            if (Object.keys(store).length !== 0 && Object.keys(loggedUser).length !== 0) fetchAPI();
            else plogToast.noLogin();
        } else {
            //unfollow
            const fetchAPI = async () => {
                const res = await apiService.unfollowUser(store.loggedUser.username, blogger.username);
                if (res.errors.length > 0) {
                    plogToast.error('Can not unfollow this blogger due to: ' + res.error);
                } else {
                    setIsFollowed(false);
                }
            };
            fetchAPI();
        }
    };

    const handleOnclickTabBtn = (e) => {
        setContent(e.target.id);
    };

    const renderContent = () => {
        console.log(content);
        switch (content) {
            case 'posts':
                return blogs.map((blog) => {
                    return <BlogItem data={blog}></BlogItem>;
                });
                break;
            case 'following':
                return blogger.following.map((username) => {
                    return <BloggerItem username={username} avatar={true}></BloggerItem>;
                });
                break;
            case 'followed':
                return blogger.followed.map((username) => {
                    return <BloggerItem username={username} avatar={true}></BloggerItem>;
                });
                break;

            default:
                break;
        }
    };

    return (
        <div className={cx('wrapper')}>
            {!isFetching && (
                <div>
                    <div className={cx('header')}>
                        <div className={cx('info')}>
                            <Image
                                to={'/blogger/' + blogger.username}
                                className={cx('avatar')}
                                src={process.env.REACT_APP_BASE_URL + config.path.FILE_STORAGE + blogger.avatar}
                            />
                            <div>
                                <a href={'/blogger/' + blogger.username} className={cx('blogger-name')}>
                                    {blogger.name}
                                </a>
                                <p className={cx('blogger-username')}>@{blogger.username}</p>
                            </div>
                        </div>
                        <Button type={isFollowed ? 'primary' : 'outline'} size="medium" onClick={handleFollowButton}>
                            {isFollowed ? 'Followed' : 'Follow'}
                        </Button>
                    </div>
                    <div className={cx('tabs_list')}>
                        <Button
                            id="posts"
                            type="text"
                            size="small"
                            fontSize="font-small"
                            className={content === 'posts' ? cx('active') : ''}
                            onClick={handleOnclickTabBtn}
                        >
                            Posts
                        </Button>
                        <Button
                            id="series"
                            type="text"
                            size="small"
                            fontSize="font-small"
                            className={content === 'series' ? cx('active') : ''}
                            onClick={handleOnclickTabBtn}
                        >
                            Series
                        </Button>
                        <Button
                            id="following"
                            type="text"
                            size="small"
                            fontSize="font-small"
                            className={content === 'following' ? cx('active') : ''}
                            onClick={handleOnclickTabBtn}
                        >
                            Following
                        </Button>
                        <Button
                            id="followed"
                            type="text"
                            size="small"
                            fontSize="font-small"
                            className={content === 'followed' ? cx('active') : ''}
                            onClick={handleOnclickTabBtn}
                        >
                            Followed
                        </Button>
                        <Button
                            id="reputations"
                            type="text"
                            size="small"
                            fontSize="font-small"
                            className={content === 'reputations' ? cx('active') : ''}
                            onClick={handleOnclickTabBtn}
                        >
                            Reputations
                        </Button>
                        <Button
                            id="contact"
                            type="text"
                            size="small"
                            fontSize="font-small"
                            className={content === 'contact' ? cx('active') : ''}
                            onClick={handleOnclickTabBtn}
                        >
                            Contact
                        </Button>
                    </div>
                    <div className={cx('overview')}>
                        <div className={cx('content')}>{renderContent()}</div>
                        <div className={cx('sidebar')}>
                            <Sidebar bestUser={false}></Sidebar>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Blogger;
