import { useState, useEffect } from 'react';

import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { draftToMarkdown } from 'markdown-draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import classNames from 'classnames/bind';

import { useStore } from '../../../storage';
import styles from './EditBlog.module.scss';
import Button from '../../Button/button';
import * as toast from '../../../utils/toast';
import * as apiService from '../../../services/apiService';
import config from '../../../config';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);
function EditBlog() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [convertedContent, setConvertedContent] = useState(null);
    const [isFetching, setIsFetching] = useState(true);

    const [store, dispatch] = useStore();
    var loggedUser = Object.keys(store).length !== 0 ? store.loggedUser : false;

    useEffect(() => {
        const fetchAPI = async () => {
            setIsFetching(true);
            const resBlog = await apiService.fetch(config.path.GET_BLOG, {
                params: {
                    id,
                },
            });
            document.title = resBlog.title;
            setIsFetching(false);
            setEditorState(EditorState.createWithContent(ContentState.createFromText(resBlog.content)));
            setTitle(resBlog.title);
            setAuthor(resBlog.user.username);
        };
        fetchAPI();
    }, [id]);

    useEffect(() => {
        const markdown = draftToMarkdown(convertToRaw(editorState.getCurrentContent()));
        setConvertedContent(markdown);
    }, [editorState]);

    const handlePreview = () => {};
    const handlePublish = () => {
        if (title === '' || convertedContent === '') {
            toast.error('Title or content could not be empty');
        } else if (author !== loggedUser.username) {
            toast.error('You have no right to edit this blog');
        } else {
            const fetchAPI = async () => {
                const res = await apiService.update(config.path.UPDATE_BLOG, {
                    id,
                    title,
                    content: convertedContent,
                    shortContent: convertedContent.slice(0, 200),
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
            {!isFetching && (
                <div className={cx('title')}>
                    <input
                        value={title}
                        type="text"
                        placeholder="Title"
                        onChange={(e) => setTitle(e.target.value)}
                    ></input>
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
            )}
            {!isFetching && (
                <Editor
                    editorState={editorState}
                    onEditorStateChange={setEditorState}
                    wrapperClassName={cx('wrapper-class')}
                    editorClassName={cx('editor-class')}
                    toolbarClassName={cx('toolbar-class')}
                />
            )}
        </div>
    );
}

export default EditBlog;
