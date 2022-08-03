
import {getLocale, setLocale} from 'umi';
// import {LogoutOutlined, SettingOutlined, UserOutlined} from '@ant-design/icons';
import {Menu, Dropdown, MenuProps} from 'antd';
import {ItemType} from 'antd/lib/menu/hooks/useItems';
import classnames from 'classnames';

import styles from './index.less';
import {useRef} from "react";

const SelectLang = () => {
    // const {initialState, setInitialState} = useModel('@@initialState');
    const {current: selectLang} = useRef(getLocale());

    const menuItems: ItemType[] = [
        // {
        //     key: 'logout',
        //     icon: <LogoutOutlined />,
        //     label: '退出登录',
        // },
        {
            key: 'zh-CN',
            // lang: 'zh-CN',
            label: '简体中文',
            icon: <span>🇨🇳</span>,
            title: '语言'
        },
        {
            key: 'en-US',
            // lang: 'en-US',
            label: 'English',
            icon: <span>🇺🇸</span>,
            title: 'Language'
        }
    ];

    const onMenuClick: MenuProps['onClick'] = (e) => {
        setLocale(e.key, true);
    };

    const menuHeaderDropdown = (<Menu selectedKeys={[selectLang]} onClick={onMenuClick} items={menuItems} />);

    return (
        <Dropdown overlay={menuHeaderDropdown}>
            <div className={styles['dropdown-item']}>
                <i className={classnames('anticon', styles['dropdown-item-lang-icon'])}>
                    <svg viewBox="0 0 24 24" focusable="false" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                        <path d="M0 0h24v24H0z" fill="none"/>
                        <path
                            className="css-c4d79v"
                            d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z "
                        />
                    </svg>
                </i>
                <div></div>
            </div>
        </Dropdown>
    );
}


export default SelectLang;
