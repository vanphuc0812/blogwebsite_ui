import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser,
    faFileLines,
    faLanguage,
    faGear,
    faRightFromBracket,
    faEarthAsia,
} from '@fortawesome/free-solid-svg-icons';

const UNLOGGED_MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faLanguage} />,
        title: 'Language',
        children: {
            title: 'Language',
            data: [
                {
                    title: 'English',
                    code: 'en',
                },
                {
                    title: 'Vietnamese',
                    code: 'vi',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faGear} />,
        title: 'Preferences',
    },
];

const LOGGED_MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'Profile',
    },
    {
        icon: <FontAwesomeIcon icon={faFileLines} />,
        title: 'My content',
        to: '/user',
    },
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'Language',
        children: {
            title: 'Language',
            data: [
                {
                    title: 'English',
                    code: 'en',
                },
                {
                    title: 'Vietnamese',
                    code: 'vi',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faGear} />,
        title: 'Preferences',
    },
    {
        icon: <FontAwesomeIcon icon={faRightFromBracket} />,
        title: 'Sign out',
        separate: true,
    },
];

export { UNLOGGED_MENU_ITEMS, LOGGED_MENU_ITEMS };
