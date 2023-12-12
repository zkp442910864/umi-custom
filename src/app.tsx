import {RunTimeLayoutConfig, createSearchParams, history, useAccess, useModel} from 'umi';

import StatusPage from '@/layouts/StatusPage';
import globalData from '@/utils/base/globalData';
import {QIANKUN, qiankun} from '@/utils/base/initQiankun';

import routes from '../config/routes';

/** https://umijs.org/zh-CN/plugins/plugin-initial-state */
export async function getInitialState () {
    let menuData: TObj[] = [];
    let dictionaries = undefined;
    let getDictionData = undefined;
    let [validMenuDataMap, allMenuDataMap, userData] = [{}, {}, {}] as TObj[];

    try {

        // TODO: 前置请求，注意报错处理
        const [ajaxMenuData, ajaxUserData] = await Promise.all<TObj[]>([
            Promise.resolve({fake: true, data: routes.filter(ii => !['*', '/'].includes(ii.path!))}),
            Promise.resolve({data: {}}),
            Promise.resolve({data: {}}),
        ]);


        menuData = ajaxMenuData.data;

        userData = ajaxUserData.data;
        // dictionaries = mapData;
        // getDictionData = getDictionDataFn;
    } catch (error) {
        console.error(error);
    }

    // window.asdf = getMenuDataApi;
    const data = {
        /** 用户数据 */
        userData,
        /** 菜单数据 */
        menuData,
        /** 有效菜单映射 */
        validMenuDataMap,
        /** 所有菜单映射，包括 children */
        allMenuDataMap,
        /** 字典数据(一次性拿下所有数据) */
        dictionaries: dictionaries!,
        /** 获取字典数据的函数 */
        getDictionData: getDictionData!,
    };

    if (process.env.NODE_ENV === 'development') {
        console.log('初始化数据', data);
    }

    return data;
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = (initData) => {

    const {initialState} = initData || {};
    const queryData = createSearchParams(history.location.search);
    const hideLeft = queryData.get('hideLeft') === '1';
    let hideAll = queryData.get('hideAll') === '1';
    const hideTop = queryData.get('hideTop') === '1';

    if (QIANKUN || window.parent !== window) {
        // globalData.offsetHeader = 56;
        hideAll = true;
    } else {
        // globalData.offsetHeader = hideTop || hideAll ? 0 : 56;
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    globalData.accessObj = useAccess();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    globalData.initialStateObj = useModel('@@initialState').initialState!;

    return {
        title: 'system',
        logo: './favicon.png',
        menu: {
            locale: false,
        },
        notFound: <StatusPage code={404} />,
        noAccessible: <StatusPage code={403} />,
        className: QIANKUN ? undefined : 'p-20 p-b-0',
        token: {
            header: {
                colorBgHeader: '#fcfcfc',
            },
            bgLayout: '#fff',
            pageContainer: {
                paddingBlockPageContainerContent: 0,
                paddingInlinePageContainerContent: 0,
            },
        },
        logout: () => {
            // console.log('退出逻辑', 1);
            window.localStorage.removeItem('Authorization');
        },
        // 底部
        // footerRender: () => <Footer />,
        // 顶部右边栏
        rightContentRender: () => <></>,
        // 传入菜单数据
        menuDataRender: () => {
            return initialState?.menuData || [];
        },
        // 每打开一个路由触发
        onPageChange: () => {},
        /*
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
        ...hideLeft ? {layout: 'top'} : {},
        ...hideTop ? {layout: 'side'} : {},
        ...hideAll ? {menuRender: false, headerRender: false, footerRender: false} : {},
    };
};


export {qiankun};
