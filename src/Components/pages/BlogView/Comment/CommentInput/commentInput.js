import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import { draftToMarkdown } from 'markdown-draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useState, useEffect } from 'react';

import classNames from 'classnames/bind';

import * as toast from '../../../../../utils/toast';
import config from '../../../../../config';
import * as apiService from '../../../../../services/apiService';

import styles from './CommentInput.module.scss';
import Button from '../../../../Button/button';

const cx = classNames.bind(styles);

function CommentInput({ parentID, blogID, setReload, loggedUser }) {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [convertedContent, setConvertedContent] = useState(null);

    useEffect(() => {
        const markdown = draftToMarkdown(convertToRaw(editorState.getCurrentContent()));
        setConvertedContent(markdown);
    }, [editorState]);

    const handleSubmitComment = () => {
        let data = {
            content: convertedContent,
            blogID: blogID,
        };
        const fetchAPI = async () => {
            console.log(data);
            const response = await apiService.postJson(config.path.SAVE_COMMENT, data);
            console.log(response);
            // if(response.e)
            setReload((current) => !current);
        };
        if (loggedUser) {
            data = { ...data, username: loggedUser.username };
            if (parentID) data = { ...data, parent: parentID };

            fetchAPI();
        } else {
            toast.noLogin();
        }
    };

    return (
        <div id="comment" className={cx('wrapper')}>
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
                <Button size="small" onClick={handleSubmitComment}>
                    Submit
                </Button>
            </div>
        </div>
    );
}

export default CommentInput;
