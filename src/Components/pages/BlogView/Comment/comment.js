import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import classNames from 'classnames/bind';

import config from '../../../../config';
import * as apiService from '../../../../services/apiService';

import styles from './Comment.module.scss';
import { useStore } from '../../../../storage';

import CommentItem from './CommentItem/commentItem';
import CommentInput from './CommentInput/commentInput';

const cx = classNames.bind(styles);

function Comment({ blog }) {
    const [store, dispatch] = useStore();
    const [comments, setComments] = useState([]);
    const [reload, setReload] = useState();
    const loggedUser = Object.keys(store).length !== 0 ? store.loggedUser : false;

    let replyState = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            const noParentComments = await apiService.fetch(config.path.GET_NO_PARENT_COMMENTS, {
                params: {
                    blogId: blog.id,
                },
            });

            const renderComments = async (data, level) => {
                const listComment = [];
                for (const comment of data) {
                    listComment.push(
                        <div key={comment.id}>
                            <CommentItem
                                comment={comment}
                                loggedUser={loggedUser.username}
                                className={cx(`comment-level${level}`)}
                                onReplyClick={handleSelectReply}
                                onDeleteClick={handleDelete}
                            />
                            {!replyState.indexOf(comment.id) === -1 && <CommentInput></CommentInput>}
                        </div>,
                    );

                    const childrenComments = await apiService.fetch(config.path.GET_CHILDREN_COMMENTS, {
                        params: {
                            parentID: comment.id,
                        },
                    });

                    if (childrenComments.length > 0) {
                        const renderedChildrenComments = await renderComments(childrenComments, level + 1);
                        listComment.push(...renderedChildrenComments);
                    }
                }
                return listComment;
            };

            const renderedComments = await renderComments(noParentComments, 0);
            setComments(renderedComments);
        };

        fetchComments();
    }, [reload]);

    const handleSelectReply = async (e) => {
        if (replyState.indexOf(e.target.id) === -1) {
            replyState.push(e.target.id);
            const targetElement = document.getElementById(e.target.id);
            const newElement = document.createElement('div');
            targetElement.insertAdjacentElement('afterend', newElement);
            ReactDOM.render(
                <CommentInput loggedUser={loggedUser} setReload={setReload} parentID={e.target.id} blogID={blog.id} />,
                newElement,
            );
        }
    };

    const handleDelete = (e) => {
        const fetchAPI = async () => {
            const respone = await apiService.deleteAPI(config.path.DELETE_COMMENT, {
                params: {
                    commentID: e.target.id,
                },
            });
            setReload((current) => !current);
        };
        fetchAPI();
    };

    return (
        <div>
            <h1 id="comment">Comment</h1>
            <CommentInput setReload={setReload} blogID={blog.id} />
            {comments}
        </div>
    );
}

export default Comment;
