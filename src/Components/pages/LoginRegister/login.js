import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
import Input from '../../Input/input';
import config from '../../../config';
import { useStore, action } from '../../../storage';

const cx = classNames.bind(styles);

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [store, dispatch] = useStore();
    const navigate = useNavigate();

    const submitLogin = () => {
        console.log(store);
        const fetchAPI = async () => {
            const response = await apiService.postJson(config.path.LOGIN, { username, password });

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
            <Link to={config.routes.home}>
                <div className={cx('logo')}>
                    <img src={images.logo} alt="PLog" />
                    <h4>Share your think</h4>
                </div>
            </Link>
            <Input
                className={cx('username')}
                value={username}
                type="text"
                placeholder="User name"
                spellCheck={false}
                onChange={(e) => setUsername(e.target.value)}
                leftIcon={<FontAwesomeIcon icon={faUser} />}
            />
            <Input
                className={cx('password')}
                value={password}
                type="password"
                placeholder="Password"
                spellCheck={false}
                onChange={(e) => setPassword(e.target.value)}
                leftIcon={<FontAwesomeIcon icon={faLock} />}
            />
            <Button onClick={submitLogin} className={cx('submit-btn')} size="large">
                Login
            </Button>
            <div className={cx('navigate')}>
                <Link to={config.routes.forgotPassword}>
                    <h5>Forgot password?</h5>
                </Link>
                <Link to={config.routes.register}>
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
            <ToastContainer />
        </div>
    );
};

export default Login;
