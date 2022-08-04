import {useModel, useAppData} from 'umi';
import {LogoutOutlined} from '@ant-design/icons';
import {Avatar, Menu, Dropdown, MenuProps} from 'antd';
import {ItemType} from 'antd/lib/menu/hooks/useItems';

import styles from './index.less';

const AvatarDropdown = () => {
    const {initialState} = useModel('@@initialState');
    const layoutConfig = useAppData().pluginManager.applyPlugins({
        key: 'layout',
        type: 'modify',
    });

    const userData = initialState?.userData || {} as TObj;

    const menuItems: ItemType[] = [
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: '退出登录',
        },
    ];

    const onMenuClick: MenuProps['onClick'] = (e) => {
        if (e.key === 'logout') {
            layoutConfig?.logout();
        }
    };

    const menuHeaderDropdown = (<Menu items={menuItems} selectedKeys={[]} onClick={onMenuClick} />);

    return (
        <Dropdown overlay={menuHeaderDropdown}>
            <div className={styles['dropdown-item']}>
                <Avatar alt="avatar" size="small" src={userData.avatar || './favicon.png'} />
                <div className={styles['dropdown-item-name']}>{userData.UserName}</div>
            </div>
        </Dropdown>
    );
};

export default AvatarDropdown;
