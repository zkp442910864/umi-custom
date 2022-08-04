
import {defineConfig, presetAttributify, presetUno} from 'unocss';

export default defineConfig({
    // envMode: dev ? 'dev' : 'build',
    presets: [
        // presetAttributify({strict}),
        // presetUno(),
    ],
    variants: [
        // 支持所有规则的 `hover:`
        // (matcher) => {
        //     if (!matcher.startsWith('hover:')) return matcher;
        //     return {
        //         // slice `hover:` prefix and passed to the next variants and rules
        //         matcher: matcher.slice(6),
        //         selector: s => `${s}:hover`,
        //     };
        // },

        // 支持 `!` 前缀，使规则优先级更高
        (matcher) => {

            if (!matcher.startsWith('!')) return matcher;

            return {
                matcher: matcher.slice(1),
                selector: (input, body) => {
                    body.forEach((item) => {
                        item[1] = `${item[1]} !important`;
                    });
                    return input;
                },
            };
        },
    ],
    rules: [
        // m-l-1 m-r-5 m-t-5 m-b-5 m-y-10 m-x-10 m-tb-10 m-lr-10 m-10
        // p-l-1 p-r-5 p-t-5 p-b-5 p-y-10 p-x-10 p-tb-10 p-lr-10 p-10
        [
            /([m|p])-([a-z|A-Z]+|\d+)-?(\d+)?/,
            ([, v1, v2, v3]) => {
                const prefix = v1 === 'm' ? 'margin' : 'padding';

                if (!isNaN(+v2)) {
                    return {
                        [prefix]: `${v2}px`,
                    };
                }

                const map: Record<string, string | undefined> = {
                    l: 'left',
                    r: 'right',
                    t: 'top',
                    b: 'bottom',
                };

                if (v2 === 'tb' || v2 === 'y') {
                    return {
                        [`${prefix}-bottom`]: `${v3}px`,
                        [`${prefix}-top`]: `${v3}px`,
                    };
                }

                if (v2 === 'lr' || v2 === 'x') {
                    return {
                        [`${prefix}-left`]: `${v3}px`,
                        [`${prefix}-right`]: `${v3}px`,
                    };
                }

                if (!map[v2]) return undefined;

                return {
                    [`${prefix}-${map[v2]}`]: `${v3}px`,
                };
            },
        ],

        // px值宽高
        // width100 width200
        // height100 height200
        // 百分比宽高
        // width-100 width-200
        // height-100 height-200
        // 字体大小 font-12 ...
        [
            /([a-z|A-Z]+)(-)?(\d+)/,
            ([, v1, v2, v3]) => {

                const val = v3;

                if (['height', 'width'].includes(v1)) {
                    const unit = v2 === '-' ? '%' : 'px';

                    return {
                        [v1]: `${val}${unit}`,
                    };
                } else if (v1 === 'font') {
                    // 字体大小 font-12 ...
                    return {
                        'font-size': `${val}px`,
                    };
                }

                return undefined;
            },
        ],
        // 文字对齐 text-center text-right ...
        [
            /([a-z|A-Z]+)(-)?([a-z|A-Z]+)/,
            ([, v1, v2, v3]) => {

                const val = v3;

                if (v1 === 'text') {
                    // 文字对齐 text-center text-right ...
                    return {
                        'text-align': `${val}`,
                    };
                } else if (v1 === 'flex') {
                    // const map = {
                    //     box: {display: 'flex'},
                    //     center: {'align-items': 'center'},
                    //     wrap: {'flex-wrap': 'wrap'},
                    //     nowrap: {'flex-wrap': 'nowrap'},
                    // };
                }

                return undefined;
            },
        ],

        // color-main color-red color-error color-gray
        [
            /color-([a-z|A-z]+)/,
            ([, v1]) => {

                const map: Record<string, string | undefined> = {
                    main: '#1890ff',
                    red: '#f5222d',
                    error: '#f5222d',
                    gray: '#999',
                };

                if (!map[v1]) return undefined;

                return {
                    color: map[v1],
                };
            },
        ],

        // 禁止选择
        ['disabled-select', {'user-select': 'none'}],
        // 禁止事件
        ['disabled-event', {'pointer-events': 'none'}],
        // 鼠标手势
        ['pointer', {cursor: 'pointer'}],
        // 定位类型
        ['abs', {position: 'absolute'}],
        ['rel', {position: 'relative'}],
        ['fixed', {position: 'fixed'}],
        ['static', {position: 'static'}],
        // 隐藏
        ['hidden', {display: 'none'}],
    ],
});
