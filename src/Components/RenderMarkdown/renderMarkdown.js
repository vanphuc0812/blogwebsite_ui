import React from 'react';
import ReactMarkdown from 'react-markdown';
import classNames from 'classnames/bind';

import styles from './RenderMarkdown.module.scss';

const cx = classNames.bind(styles);

function RenderMarkdown({ markdownData }) {
    return <ReactMarkdown className={cx('markdown')}>{markdownData}</ReactMarkdown>;
}

export default RenderMarkdown;
