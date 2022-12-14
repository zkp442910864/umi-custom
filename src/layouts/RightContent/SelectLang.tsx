
import {getLocale, setLocale} from 'umi';
// import {LogoutOutlined, SettingOutlined, UserOutlined} from '@ant-design/icons';
import {MenuProps} from 'antd';
import classnames from 'classnames';
import {useRef} from 'react';

import {AccessDropdown, IAccessDropdownProps} from '@/components/AccessModules';

import styles from './index.less';

const SelectLang = () => {
    const {current: selectLang} = useRef(getLocale());

    const menuItems: IAccessDropdownProps['config'] = [
        {
            key: 'zh-CN',
            label: '简体中文',
            icon: <span>🇨🇳</span>,
            title: '语言',
        },
        // {
        //     type: 'divider',
        // },
        {
            key: 'en-US',
            label: 'English',
            icon: <span>🇺🇸</span>,
            title: 'Language',
        },
    ];

    const onMenuClick: IAccessDropdownProps['onSelect'] = (e) => {
        setLocale(e.key, true);
    };

    return (
        <AccessDropdown
            config={menuItems}
            menuProps={{
                selectedKeys: [selectLang],
            }}
            onSelect={onMenuClick}
        >
            <div className={styles['dropdown-item']}>
                <i className={classnames(styles['dropdown-item-lang-icon'])}>
                    <svg
                        aria-hidden="true"
                        fill="currentColor"
                        focusable="false"
                        height="1em"
                        viewBox="0 0 24 24"
                        width="1em"
                    >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path
                            className="css-c4d79v"
                            d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z "
                        />
                    </svg>
                </i>
                <div />
            </div>
        </AccessDropdown>
    );
};


export default SelectLang;
