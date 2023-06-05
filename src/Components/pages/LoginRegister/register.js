import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './LoginRegister.module.scss';
import images from '../../../asset/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../Button';
import { faEnvelope, faLock, faUser, faFileSignature, faUserLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { faFacebook, faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import * as apiService from '../../../services/apiService';

const cx = classNames.bind(styles);

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const submitLogin = () => {
        const response = apiService.postJson('auth/register', { username, password });
    };

    return (
        <div className={cx('container')}>
            <div className={cx('logo', 'register-logo')}>
                <img src={images.logo} alt="PLog" />
                <h4>Share your think</h4>
            </div>
            <div className={cx('wrapper')}>
                <div className={cx('input-box')}>
                    <Button
                        className={cx('login-icon')}
                        size="icon-btn"
                        type="text"
                        leftIcon={<FontAwesomeIcon icon={faFileSignature} />}
                    />
                    <input
                        value={username}
                        type="text"
                        placeholder="Your name"
                        spellCheck={false}
                        onChange={handleUsernameChange}
                    />
                </div>
                <div className={cx('input-box')}>
                    <Button
                        className={cx('login-icon')}
                        size="icon-btn"
                        type="text"
                        leftIcon={<FontAwesomeIcon icon={faEnvelope} />}
                    />
                    <input
                        value={username}
                        type="text"
                        placeholder="Email"
                        spellCheck={false}
                        onChange={handleUsernameChange}
                    />
                </div>
                <div className={cx('input-box')}>
                    <Button
                        className={cx('login-icon')}
                        size="icon-btn"
                        type="text"
                        leftIcon={<FontAwesomeIcon icon={faUser} />}
                    />
                    <input
                        value={username}
                        type="text"
                        placeholder="User name"
                        spellCheck={false}
                        onChange={handleUsernameChange}
                    />
                </div>
                <div className={cx('input-box')}>
                    <Button
                        className={cx('login-icon')}
                        size="icon-btn"
                        type="text"
                        leftIcon={<FontAwesomeIcon icon={faLockOpen} />}
                    />
                    <input
                        value={password}
                        type="password"
                        placeholder="Password"
                        spellCheck={false}
                        onChange={handlePasswordChange}
                    />
                </div>
                <div className={cx('input-box')}>
                    <Button
                        className={cx('login-icon')}
                        size="icon-btn"
                        type="text"
                        leftIcon={<FontAwesomeIcon icon={faLock} />}
                    />
                    <input
                        value={password}
                        type="password"
                        placeholder="Confirm password"
                        spellCheck={false}
                        onChange={handlePasswordChange}
                    />
                </div>
                <Button onClick={submitLogin} className={cx('submit-btn')} size="large">
                    Login
                </Button>
                <div className={cx('navigate')}>
                    <div className={cx('term')}>
                        <input type="checkbox" />
                        <h5>
                            I agree with terms of <span>Plog</span>
                        </h5>
                    </div>
                    <Link to="/auth/login">
                        <h5>Log in</h5>
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
        </div>
    );
}

export default Register;
