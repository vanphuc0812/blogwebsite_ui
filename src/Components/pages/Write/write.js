import { useState, useEffect } from 'react';

import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import { draftToMarkdown } from 'markdown-draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import classNames from 'classnames/bind';

import { useStore } from '../../../storage';
import styles from './Write.module.scss';
import Button from '../../Button/button';
import * as toast from '../../../utils/toast';
import * as apiService from '../../../services/apiService';
import config from '../../../config';

const cx = classNames.bind(styles);
function Write() {
    const [title, setTitle] = useState('');
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [convertedContent, setConvertedContent] = useState(null);
    const [store, dispatch] = useStore();
    var loggedUser = Object.keys(store).length !== 0 ? store.loggedUser : false;
    useEffect(() => {
        const markdown = draftToMarkdown(convertToRaw(editorState.getCurrentContent()));
        setConvertedContent(markdown);
    }, [editorState]);

    const handlePreview = () => {};
    const handlePublish = () => {
        if (title === '' || convertedContent === '') {
            toast.error('Title or content could not be empty');
        } else {
            const fetchAPI = async () => {
                const res = await apiService.postJson(config.path.SAVE_BLOG, {
                    title,
                    content: convertedContent,
                    username: loggedUser.username,
                });
                if (res.errors.length > 0) {
                    toast.error('Can not pushlish this post');
                } else {
                    console.log(res);
                }
            };
            if (Object.keys(store).length !== 0 && Object.keys(loggedUser).length !== 0) fetchAPI();
            else toast.noLogin();
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <input value={title} type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)}></input>
                <Button
                    className={cx('button')}
                    type="outline"
                    size="medium"
                    fontSize={cx('font-small')}
                    onClick={handlePreview}
                >
                    Preview
                </Button>
                <Button
                    className={cx('button')}
                    type="outline"
                    size="medium"
                    fontSize={cx('font-small')}
                    onClick={handlePublish}
                >
                    Publish
                </Button>
            </div>
            <Editor
                editorState={editorState}
                onEditorStateChange={setEditorState}
                wrapperClassName={cx('wrapper-class')}
                editorClassName={cx('editor-class')}
                toolbarClassName={cx('toolbar-class')}
                // toolbar={{
                //     options: ['inline', 'blockType', 'emoji'],
                // }}
            />
        </div>
    );
}

export default Write;
