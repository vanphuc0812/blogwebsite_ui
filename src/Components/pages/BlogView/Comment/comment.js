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

    // useEffect(() => {
    //     const fetchAPI = async () => {
    //         const resComment = await apiService.fetch(config.path.GET_BLOG, {
    //             params: {
    //                 id,
    //             },
    //         });
    //         const resUser = await apiService.fetch(config.path.GET_USER_BY_USERNAME, {
    //             params: {
    //                 username: resBlog.user.username,
    //             },
    //         });

    //         document.title = resBlog.title;
    //     };
    //     fetchAPI();
    // }, [id]);

    const inputComment = (
        <div className={cx('comment')}>
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
            <CommentItem
                comment={{
                    content: 'Test comment',
                    likes: 0,
                    user: {
                        id: '7add5363-9f20-4d14-84f1-bc52f1878a0b',
                        name: 'Nguyen Xuan Chien',
                        username: 'Chibi',
                        email: 'Chibi@gmail.com',
                        avatar: '04c4c749-c7e4-48a4-8f77-1802c6e0bf28.png',
                    },
                    parent: null,
                }}
            ></CommentItem>
        </div>
    );
}

export default Comment;
