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

    const userData = initialState?.userData || {};

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

    const menuHeaderDropdown = (<Menu selectedKeys={[]} onClick={onMenuClick} items={menuItems} />);

    return (
        <Dropdown overlay={menuHeaderDropdown}>
            <div className={styles['dropdown-item']}>
                <Avatar size="small" src={userData.avatar || './favicon.png'} alt="avatar" />
                <div className={styles['dropdown-item-name']}>{userData.name || '名称'}</div>
            </div>
        </Dropdown>
    );
};

export default AvatarDropdown;
