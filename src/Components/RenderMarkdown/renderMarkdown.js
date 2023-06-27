import React from 'react';
import ReactMarkdown from 'react-markdown';
import classNames from 'classnames/bind';

import styles from './RenderMarkdown.module.scss';
import { post } from '../../utils/http';

const cx = classNames.bind(styles);

function flatten(text, child) {
    return typeof child === 'string'
        ? text + child
        : React.Children.toArray(child.props.children).reduce(flatten, text);
}

function HeadingRenderer(props) {
    var children = React.Children.toArray(props.children);
    var text = children.reduce(flatten, '');
    var slug = '_' + text.toLowerCase().replace(/\W/g, '-');
    return React.createElement('h' + props.level, { id: slug }, props.children);
}

function RenderMarkdown({ markdownData, style = 'post' }) {
    return (
        <ReactMarkdown
            components={{
                h1: HeadingRenderer,
                h2: HeadingRenderer,
                h3: HeadingRenderer,
                h4: HeadingRenderer,
                h5: HeadingRenderer,
            }}
            className={cx(style)}
        >
            {markdownData}
        </ReactMarkdown>
    );
}

export default RenderMarkdown;
