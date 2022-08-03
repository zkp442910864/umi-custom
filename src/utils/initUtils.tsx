/**
 * 初始化数据的函数
 */
import react from 'react';

import {formatMessage, getLanguage} from './intlUtils';

/** 处理菜单 */
export const handlerMenuData = async (data: TObj[]) => {
    const allIcon = await import('@ant-design/icons');
    const defaultIcon = allIcon.SmileOutlined;
    const isZh = getLanguage() === 'zh_cn';
    const allAddressMap: TObj = {};
    const validAddressMap: TObj = {};

    const each = (data: TObj[], level = 0) => {

        data.forEach((item) => {
            const iconData = allIcon[item.icon as keyof typeof allIcon] as typeof defaultIcon | undefined;

            // 非中文，匹配语言
            if (!isZh && item.locale) {
                item.name = formatMessage(item.locale, item.name);
            }

            // 匹配icon
            if (level === 0) {
                item.icon = react.createElement(iconData || defaultIcon);
            } else {
                item.icon = react.createElement(iconData || '');
            }

            // 循环映射
            if (item?.children?.length) {
                each(item.children, level + 1);
            } else {
                validAddressMap[item.path] = item;
                validAddressMap[item.path.toLocaleLowerCase()] = item;
            }

            allAddressMap[item.path] = item;
            allAddressMap[item.path.toLocaleLowerCase()] = item;
        });
    };

    each(data);

    return {
        menuData: data,
        validMenuDataMap: validAddressMap,
        allMenuDataMap: allAddressMap,
    };

};

/** 处理字典数据 */
export const handlerDictionaries = () => {};
