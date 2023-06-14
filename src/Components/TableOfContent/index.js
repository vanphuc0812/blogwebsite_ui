// import { useHeadsObserver } from './hook';
import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './TableOfContent.module.scss';

const cx = classNames.bind(styles);

const getClassName = (level) => {
    switch (level) {
        case 2:
            return 'head2';
        case 3:
            return 'head3';
        case 4:
            return 'head4';
        default:
            return null;
    }
};

function TableOfContent() {
    const [headings, setHeadings] = useState([]);
    // const { activeId } = useHeadsObserver();

    useEffect(() => {
        const elements = Array.from(document.querySelectorAll('h1, h2, h3, h4'))
            .filter((elem) => {
                return elem.id === '' ? false : true;
            })
            .map((elem) => ({
                id: elem.id,
                text: elem.innerText,
                level: Number(elem.nodeName.charAt(1)),
            }));
        setHeadings(elements);
    }, []);

    return (
        <div className={cx('toc-wrapper')}>
            <nav>
                <ul>
                    {headings.map((heading) => (
                        <li key={heading.id} className={cx('head' + heading.level)}>
                            <a
                                href={`#${heading.id}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    var element = document.querySelector(`#${heading.id}`);
                                    var headerOffset = 60;
                                    var elementPosition = element.getBoundingClientRect().top;
                                    var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                                    window.scrollTo({
                                        top: offsetPosition,
                                        behavior: 'smooth',
                                    });
                                }}
                                // style={{
                                //     fontWeight: activeId === heading.id ? 'bold' : 'normal',
                                // }}
                            >
                                {heading.text}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}

export default TableOfContent;
