import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './LoginRegister.module.scss';
import images from '../../../asset/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../Button/button';
import {
    faEnvelope,
    faLock,
    faUser,
    faFileSignature,
    faLockOpen,
    faVenusMars,
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { faFacebook, faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import * as apiService from '../../../services/apiService';
import Input from '../../Input/input';
import config from '../../../config';
import * as plogToast from '../../../utils/toast';

const cx = classNames.bind(styles);

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [gender, setGender] = useState('MALE');
    const navigate = useNavigate();

    const submitRegister = () => {
        const fetchAPI = async () => {
            const response = await apiService.postJson(config.path.REGISTER, {
                name,
                username,
                password,
                email,
                gender,
            });
            if (response.errors.length === 0) {
                navigate('/');
            } else {
                plogToast.error('Register failed: ' + response.errors);
            }
        };
        if (
            name === '' ||
            username === '' ||
            password === '' ||
            confirmPassword === '' ||
            email === '' ||
            gender === ''
        ) {
            plogToast.error('Please input full information');
        } else if (confirmPassword !== password) {
            plogToast.error('Password is not matched');
        } else fetchAPI();
    };

    return (
        <div className={cx('container')}>
            <Link to={config.routes.home}>
                <div className={cx('logo', 'register-logo')}>
                    <img src={images.logo} alt="PLog" />
                    <h4>Share your think</h4>
                </div>
            </Link>
            <div className={cx('wrapper')}>
                <div className={cx('user-detail')}>
                    <Input
                        className={cx('name')}
                        value={name}
                        type="text"
                        placeholder="Your name"
                        spellCheck={false}
                        leftIcon={<FontAwesomeIcon icon={faFileSignature} />}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <div className={cx('gender')}>
                        <FontAwesomeIcon icon={faVenusMars} />{' '}
                        <select id="gender" name="gender" onChange={(e) => setGender(e.target.value)}>
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                            <option value="OTHER">Other</option>
                        </select>
                    </div>
                </div>

                <Input
                    className={cx('email')}
                    value={email}
                    type="text"
                    placeholder="Email"
                    spellCheck={false}
                    onChange={(e) => setEmail(e.target.value)}
                    leftIcon={<FontAwesomeIcon icon={faEnvelope} />}
                />
                <Input
                    className={cx('username')}
                    value={username}
                    type="text"
                    placeholder="User name"
                    spellCheck={false}
                    onChange={(e) => setUsername(e.target.value)}
                    leftIcon={<FontAwesomeIcon icon={faUser} />}
                />
                <div className={cx('password')}>
                    <Input
                        className={cx('password')}
                        value={password}
                        type="password"
                        placeholder="Password"
                        spellCheck={false}
                        onChange={(e) => setPassword(e.target.value)}
                        leftIcon={<FontAwesomeIcon icon={faLockOpen} />}
                    />
                    <Input
                        className={cx('confirm-password')}
                        value={confirmPassword}
                        type="password"
                        placeholder="Confirm password"
                        spellCheck={false}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        leftIcon={<FontAwesomeIcon icon={faLock} />}
                    />
                </div>

                <Button onClick={submitRegister} className={cx('submit-btn')} size="large">
                    Sign up
                </Button>
                <div className={cx('navigate')}>
                    <div className={cx('term')}>
                        <input type="checkbox" />
                        <h5>
                            I agree with terms of <span>Plog</span>
                        </h5>
                    </div>
                    <Link to={config.routes.login}>
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
