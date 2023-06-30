import styles from './NotFound.module.scss';
import classNames from 'classnames/bind';
import images from '../../../asset/images';

const cx = classNames.bind(styles);
function NotFound() {
    return (
        <section class={cx('wrapper')}>
            <div class={cx('container')}>
                <div>
                    <div>
                        <div>
                            <div
                                class={cx('header')}
                                style={{
                                    backgroundImage: `url(${images.notFound})`,
                                }}
                            >
                                <h1>404</h1>
                            </div>

                            <div class={cx('content')}>
                                <h3>Look like you're lost</h3>

                                <p>the page you are looking for not avaible!</p>

                                <a href="/" class={cx('home-btn')}>
                                    Go to Home
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default NotFound;
