import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import classNames from 'classnames/bind';
import StickyBox from 'react-sticky-box';

import config from '../../../config';
import * as apiService from '../../../services/apiService';
import RenderMarkdown from '../../RenderMarkdown/renderMarkdown';
import styles from './Blogview.module.scss';
import Sidebar from '../../../layouts/components/Sidebar/sidebar';
const cx = classNames.bind(styles);
function BlogView() {
    const { id } = useParams();
    const [blog, setBlog] = useState({});

    useEffect(() => {
        const fetchAPI = async () => {
            const resBlog = await apiService.fetch(config.path.GET_BLOG, {
                params: {
                    id,
                },
            });
            document.title = resBlog.title;
            setBlog(resBlog);
        };

        fetchAPI();
    }, [id]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <h1 className={cx('blog-title')}>{blog.title}</h1>
                <RenderMarkdown markdownData={blog.content}></RenderMarkdown>
            </div>
            <div className={cx('sidebar')}>
                <StickyBox offsetTop={90}>
                    <Sidebar />
                </StickyBox>
            </div>
        </div>
    );
}

export default BlogView;
