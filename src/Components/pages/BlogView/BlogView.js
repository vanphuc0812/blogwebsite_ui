import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import classNames from 'classnames/bind';
import StickyBox from 'react-sticky-box';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional

import config from '../../../config';
import * as apiService from '../../../services/apiService';
import RenderMarkdown from '../../RenderMarkdown/renderMarkdown';
import styles from './Blogview.module.scss';
import Sidebar from '../../../layouts/components/Sidebar/sidebar';
import TableOfContent from '../../TableOfContent';
import Image from '../../Image/image';
import Button from '../../Button/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faComment, faEye, faStar, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { useStore } from '../../../storage';
import * as plogToast from '../../../utils/toast';
import Comment from './Comment/comment';
const cx = classNames.bind(styles);
function BlogView() {
    const { id } = useParams();
    const [blog, setBlog] = useState({});
    const [author, setAuthor] = useState({});
    const [store, dispatch] = useStore();

    var loggedUser = Object.keys(store).length !== 0 ? store.loggedUser : false;

    const [isFollowed, setIsFollowed] = useState(false);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        const fetchAPI = async () => {
            setIsFetching(true);
            const resBlog = await apiService.fetch(config.path.GET_BLOG, {
                params: {
                    id,
                },
            });
            const resUser = await apiService.fetch(config.path.GET_USER_BY_USERNAME, {
                params: {
                    username: resBlog.user.username,
                },
            });

            document.title = resBlog.title;
            setIsFetching(false);
            setBlog(resBlog);
            setAuthor(resUser);
        };
        fetchAPI();
    }, [id]);

    useEffect(() => {
        if (
            loggedUser &&
            loggedUser.following.filter((username) => {
                return username === author.username;
            }).length > 0
        )
            setIsFollowed(true);
    }, [loggedUser, author]);

    const handleFollowButton = () => {
        if (!isFollowed) {
            const fetchAPI = async () => {
                const res = await apiService.followUser(loggedUser.username, author.username);
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
                const res = await apiService.unfollowUser(store.loggedUser.username, author.username);
                if (res.errors.length > 0) {
                    plogToast.error('Can not unfollow this blogger due to: ' + res.error);
                } else {
                    setIsFollowed(false);
                }
            };
            fetchAPI();
        }
    };

    const handleCommentButton = () => {
        try {
            var element = document.querySelector('#comment');
            var headerOffset = 60;

            var elementPosition = element.getBoundingClientRect().top;
            console.log(elementPosition);
            var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            });
        } catch {}
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('post-content')}>
                    {!isFetching && (
                        <div className={cx('author')}>
                            <div className={cx('author-info')}>
                                <Image
                                    to={'/blogger/' + author.username}
                                    className={cx('avatar')}
                                    src={process.env.REACT_APP_BASE_URL + config.path.FILE_STORAGE + author.avatar}
                                />
                                <div>
                                    <a href={'/blogger/' + author.username} className={cx('author-name')}>
                                        {author.name}
                                    </a>
                                    <span className={cx('author-username')}>@{author.username}</span>
                                    <Button
                                        type={isFollowed ? 'primary' : 'outline'}
                                        size="small"
                                        onClick={handleFollowButton}
                                    >
                                        {isFollowed ? 'Followed' : 'Follow'}
                                    </Button>

                                    <div>
                                        <Tippy content="Reputation" placement="bottom">
                                            <span>
                                                <Button
                                                    size="small"
                                                    leftIcon={<FontAwesomeIcon icon={faStar} />}
                                                    type="text"
                                                >
                                                    1.5k
                                                </Button>
                                            </span>
                                        </Tippy>
                                        <Tippy content="Following" placement="bottom">
                                            <span>
                                                <Button
                                                    size="small"
                                                    leftIcon={<FontAwesomeIcon icon={faUserPlus} />}
                                                    type="text"
                                                >
                                                    {author.followed.length}
                                                </Button>
                                            </span>
                                        </Tippy>
                                        {/* <Button size="small" leftIcon={<FontAwesomeIcon icon={faPen} />} type="text">
                                            1.5k
                                        </Button> */}
                                    </div>
                                </div>
                            </div>
                            <div className={cx('post-info')}>
                                <span className={cx('post-date')}>
                                    post at {blog.createdAt} - {(blog.content.split(' ').length / 200).toFixed()}{' '}
                                    minnute to read
                                </span>
                                <br />
                                <div>
                                    <Tippy content="Views" placement="bottom">
                                        <span>
                                            <Button
                                                size="small"
                                                leftIcon={<FontAwesomeIcon icon={faEye} />}
                                                type="text"
                                            >
                                                {blog.views}
                                            </Button>
                                        </span>
                                    </Tippy>
                                    <Tippy content="Go to comment part" placement="bottom">
                                        <span>
                                            <Button
                                                onClick={handleCommentButton}
                                                size="small"
                                                leftIcon={<FontAwesomeIcon icon={faComment} />}
                                                type="text"
                                            >
                                                1.5k
                                            </Button>
                                        </span>
                                    </Tippy>
                                    <Tippy content="Bookmark" placement="bottom">
                                        <span>
                                            <Button
                                                size="small"
                                                leftIcon={<FontAwesomeIcon icon={faBookmark} />}
                                                type="text"
                                            >
                                                1.5k
                                            </Button>{' '}
                                        </span>
                                    </Tippy>
                                </div>
                            </div>
                        </div>
                    )}
                    <h1 className={cx('blog-title')}>{blog.title}</h1>
                    <RenderMarkdown markdownData={blog.content}></RenderMarkdown>
                </div>

                {!isFetching && (
                    <div className={cx('sidebar')}>
                        <StickyBox offsetTop={90}>
                            <Sidebar toc={<TableOfContent />}></Sidebar>
                        </StickyBox>
                    </div>
                )}
            </div>
            {!isFetching && <Comment author={author} blog={blog} />}
        </div>
    );
}

export default BlogView;
