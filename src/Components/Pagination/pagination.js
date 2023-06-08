import React from 'react';
import Button from '../Button';
import classNames from 'classnames/bind';
import styles from './Pagination.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeftLong, faRightLong } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [...Array(totalPages).keys()].map((num) => (num = num + 1));
    const visiblePages = 2;
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const renderPageButtons = () => {
        const pageButtons = [];

        // Hiển thị 2 trang đầu
        for (let i = 1; i <= 2; i++) {
            pageButtons.push(
                <Button
                    type="outline"
                    size="icon-btn"
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={i === currentPage ? cx('active') : ''}
                >
                    {i}
                </Button>,
            );
        }

        // Hiển thị trang hiện tại và các trang xung quanh
        if (currentPage - visiblePages > 3) {
            pageButtons.push(
                <Button type="disable" size="icon-btn" key="ellipsis">
                    ...
                </Button>,
            );
        }

        var startIndex = currentPage - visiblePages;
        var endIndex = currentPage + visiblePages;
        if (currentPage <= 4) {
            startIndex = 1;
            endIndex = endIndex + visiblePages + 3 - currentPage;
        }
        if (currentPage >= totalPages - 3) {
            startIndex = startIndex - visiblePages - 1 + (totalPages - 1 - currentPage);
            endIndex = totalPages - 1;
        }

        for (let i = startIndex; i <= endIndex; i++) {
            if (i > 2 && i < totalPages - 1) {
                pageButtons.push(
                    <Button
                        type="outline"
                        size="icon-btn"
                        key={i}
                        onClick={() => handlePageChange(i)}
                        className={i === currentPage ? cx('active') : ''}
                    >
                        {i}
                    </Button>,
                );
            }
        }

        if (currentPage + visiblePages < totalPages - 2) {
            pageButtons.push(
                <Button type="disable" size="icon-btn" key="ellipsis2">
                    ...
                </Button>,
            );
        }

        // Hiển thị 2 trang cuối
        for (let i = totalPages - 1; i <= totalPages; i++) {
            pageButtons.push(
                <Button
                    type="outline"
                    size="icon-btn"
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={i === currentPage ? cx('active') : ''}
                >
                    {i}
                </Button>,
            );
        }

        return pageButtons;
    };
    return (
        <div className={cx('wrapper')}>
            <Button
                type="outline"
                size="icon-btn"
                onClick={() => onPageChange(currentPage === 1 ? 1 : currentPage - 1)}
                leftIcon={<FontAwesomeIcon icon={faLeftLong} />}
            ></Button>
            {renderPageButtons()}
            <Button
                type="outline"
                size="icon-btn"
                onClick={() => onPageChange(currentPage === totalPages ? totalPages : currentPage + 1)}
                leftIcon={<FontAwesomeIcon icon={faRightLong} />}
            ></Button>
        </div>
    );
};

export default Pagination;
