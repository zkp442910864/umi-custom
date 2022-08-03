import {RunTimeLayoutConfig, createSearchParams, history, setLocale, getLocale} from 'umi';
import {SmileOutlined} from '@ant-design/icons';

import Footer from '@/layouts/Footer';
import RightContent from '@/layouts/RightContent';
import StatusPage from '@/pages/StatusPage';
import {handlerMenuData, handlerDictionaries} from '@/utils/initUtils';

console.log('app');

/** https://umijs.org/zh-CN/plugins/plugin-initial-state */
export async function getInitialState () {
    let [menuData, validMenuDataMap, allMenuDataMap] = [[] as TObj[], {}, {}];

    try {
        // setLocale(getLocale(), false);

        // TODO: 前置请求，注意报错处理

        ({menuData, validMenuDataMap, allMenuDataMap} = await handlerMenuData([
            {path: '/', name: '首页-服务端返回', locale: 'navBar.lang', icon: ''},
            {path: '/test', name: '测试', icon: 'SmileOutlined'},
            // {path: '/docs123', name: 'docs123', icon: 'SmileOutlined'},
        ]));
    } catch (error) {
        console.error(error);
    }

    return {
        /** 用户数据 */
        userData: {} as TObj,
        /** 菜单数据 */
        menuData,
        /** 有效菜单映射 */
        validMenuDataMap,
        /** 所有菜单映射，包括 children */
        allMenuDataMap,
        /** 字典数据(一次性拿下所有数据) */
        dictionaries: {},
    }
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = (initData) => {

    const {initialState} = initData || {};
    const queryData = createSearchParams(history.location.search);
    const hideLeft = queryData.get('hideLeft') === '1';
    const hideTop = queryData.get('hideTop') === '1';
    const hideAll = queryData.get('hideAll') === '1';

    return {
        title: 'x-system',
        logo: './favicon.png',
        menu: {
            locale: false,
        },
        notFound: <StatusPage code={404} />,
        noAccessible: <StatusPage code={403} />,
        logout: () => {
            console.log('退出逻辑', 1);
        },
        footerRender: () => <Footer />,
        rightContentRender: () => <RightContent />,
        menuDataRender: () => {
            return initialState?.menuData || [];
        },
        onPageChange: (location) => {
            console.log(initialState);
        },
        style: {
            minHeight: '100vh'
        },

        /* // 菜单底部功能
        menuFooterRender: () => {
            return (
                <>菜单底部</>
            );
        },
        avatarProps: {
            title: 'eeee'
        },
        items: [
            {
                title: 'qweeee',
                icon: <SmileOutlined/>,
                danger: true,
                key: '1',
            }
        ],
        actionsRender: () => {
            return [
                <>123</>,
                <>123456</>,
            ];
        }, */

        // navTheme: 'light',
        // primaryColor: '#1890ff',
        // 顶部高度
        headerHeight: 55,
        // 右部菜单栏宽度
        siderWidth: 255,
        // 布局
        layout: 'mix',
        // 固定头部
        fixedHeader: true,
        // 固定右部
        fixSiderbar: true,

        // 显示，自定义 头部
        // headerRender: false,
        // 显示，自定义 菜单
        // menuRender: false,
        ...(hideLeft ? {layout: 'top'} : {}),
        ...(hideTop ? {layout: 'side'} : {}),
        ...(hideAll ? {menuRender: false, headerRender: false, footerRender: false} : {}),
    };
};
