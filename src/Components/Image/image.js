import classNames from 'classnames';
import { useState, forwardRef } from 'react';
import images from '../../asset/images';
import styles from './Image.module.scss';
import { Link } from 'react-router-dom';

const Image = forwardRef(({ src, alt, className, fallBack: customFallBack = images.noImage, to, ...prop }, ref) => {
    const [fallBack, setFallBack] = useState('');

    const handleError = () => {
        setFallBack(customFallBack);
    };
    if (to) {
        return (
            <Link to={to} ref={ref}>
                <img
                    className={classNames(styles.wrapper, className)}
                    src={fallBack || src}
                    alt={alt}
                    {...prop}
                    onError={handleError}
                ></img>
            </Link>
        );
    } else {
        return (
            <img
                className={classNames(styles.wrapper, className)}
                ref={ref}
                src={fallBack || src}
                alt={alt}
                {...prop}
                onError={handleError}
            ></img>
        );
    }
});

export default Image;
