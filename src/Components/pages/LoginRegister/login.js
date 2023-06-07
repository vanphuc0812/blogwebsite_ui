import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../storage';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { faFacebook, faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';

import classNames from 'classnames/bind';

import styles from './LoginRegister.module.scss';
import Button from '../../Button';
import images from '../../../asset/images';
import * as apiService from '../../../services/apiService';
import { action } from '../../../storage';

const cx = classNames.bind(styles);

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [store, dispatch] = useStore();
    const navigate = useNavigate();
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const submitLogin = () => {
        console.log(store);
        const fetchAPI = async () => {
            const response = await apiService.postJson('auth/login', { username, password });

            if (response.errors.length === 0) {
                dispatch(action.setLoggedUser(response.content));
                navigate('/');
            } else {
                toast.error('Login failed: ' + response.errors, {
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: true,
                    autoClose: 3000,
                });
            }
        };

        fetchAPI();
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('logo')}>
                <img src={images.logo} alt="PLog" />
                <h4>Share your think</h4>
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
                    placeholder="User name or email"
                    spellCheck={false}
                    onChange={handleUsernameChange}
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
                    <h5>Forgot password?</h5>
                </Link>
                <Link to="/auth/register">
                    <h5>Sign up</h5>
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
            <ToastContainer />
        </div>
    );
};

export default Login;
