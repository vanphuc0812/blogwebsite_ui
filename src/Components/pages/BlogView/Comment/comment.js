import { useState, useEffect } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import { draftToMarkdown } from 'markdown-draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import classNames from 'classnames/bind';

import config from '../../../../config';
import * as apiService from '../../../../services/apiService';

import styles from './Comment.module.scss';

import Button from '../../../Button/button';
import Image from '../../../Image/image';
import CommentItem from './CommentItem/commentItem';

const cx = classNames.bind(styles);

function Comment({ author, blog }) {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [comments, setComments] = useState([]);

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
                        <CommentItem key={comment.id} comment={comment} className={cx(`comment-level${level}`)} />,
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
    }, []);

    const inputComment = (
        <div id="comment" className={cx('comment')}>
            <h1>Comment</h1>
            <Editor
                editorState={editorState}
                onEditorStateChange={setEditorState}
                wrapperClassName={cx('wrapper-class')}
                editorClassName={cx('editor-class')}
                toolbarClassName={cx('toolbar-class')}
                toolbar={{
                    options: ['inline', 'list', 'link', 'image', 'emoji'],
                }}
            />
            <div className={cx('submit-btn')}>
                <Button size="medium">Submit</Button>
            </div>
        </div>
    );
    return (
        <div>
            {inputComment}
            {comments}
        </div>
    );
}

export default Comment;
