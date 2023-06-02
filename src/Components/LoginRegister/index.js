import React, { useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from './LoginRegister.module.scss';
import { Wrapper as PopperWrapper } from '../Popper';
import images from '../../asset/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../Button';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { faFacebook, faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import * as apiService from '../../services/apiService';

const cx = classNames.bind(styles);

const LoginPopup = ({ children }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const submitLogin = () => {
        const response = apiService.postJson('auth/login', { username, password });
        //do something with respone
    };

    return (
        <div className="background">
            <div className="container">
                <Tippy
                    trigger="click"
                    placement="bottom"
                    interactive
                    popperOptions={{
                        modifiers: [
                            {
                                name: 'preventOverflow',
                                options: {
                                    boundariesElement: 'window',
                                },
                            },
                        ],
                    }}
                    offset={[-400, 100]}
                    render={(attr) => (
                        <PopperWrapper>
                            <div className={cx('wrapper')}>
                                <div className={cx('logo')}>
                                    <img src={images.logo} alt="PLog" />
                                    <h4>Share your think</h4>
                                </div>
                                <div className={cx('username')}>
                                    <Button
                                        className={cx('login-icon')}
                                        size="icon-btn"
                                        type="text"
                                        leftIcon={<FontAwesomeIcon icon={faUser} />}
                                    />
                                    <input
                                        value={username}
                                        type="text"
                                        placeholder="User name or email"
                                        spellCheck={false}
                                        onChange={handleUsernameChange}
                                    />
                                </div>
                                <div className={cx('password')}>
                                    <Button
                                        className={cx('login-icon')}
                                        size="icon-btn"
                                        type="text"
                                        leftIcon={<FontAwesomeIcon icon={faLock} />}
                                    />
                                    <input
                                        value={password}
                                        type="text"
                                        placeholder="Password"
                                        spellCheck={false}
                                        onChange={handlePasswordChange}
                                    />
                                </div>
                                <Button onClick={submitLogin} className={cx('submit-btn')} size="large">
                                    Login
                                </Button>
                                <div className={cx('navigate')}>
                                    <Link to="/auth/forgotPassword">
                                        <p>Forgot password?</p>
                                    </Link>
                                    <Link to="/auth/register">
                                        <p>Sign up</p>
                                    </Link>
                                </div>
                                <div className={cx('login-as-lbl')}>
                                    <hr />
                                    <p>Login as</p>
                                    <hr />
                                </div>
                                <div className={cx('login-as-btn')}>
                                    <Button
                                        type="outline"
                                        size="medium"
                                        leftIcon={<FontAwesomeIcon style={{ color: '#0058f0' }} icon={faFacebook} />}
                                    >
                                        Facebook
                                    </Button>
                                    <Button
                                        type="outline"
                                        size="medium"
                                        leftIcon={<FontAwesomeIcon style={{ color: '#e70d0d' }} icon={faGoogle} />}
                                    >
                                        Google
                                    </Button>
                                    <Button
                                        type="outline"
                                        size="medium"
                                        leftIcon={<FontAwesomeIcon style={{ color: '#000' }} icon={faGithub} />}
                                    >
                                        Github
                                    </Button>
                                </div>
                            </div>
                        </PopperWrapper>
                    )}
                >
                    {children}
                </Tippy>
            </div>
        </div>
    );
};

export default LoginPopup;
