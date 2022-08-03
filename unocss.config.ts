
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

        // px值
        // width100 width200
        // height100 height200
        // 百分比
        // width-100 width-200
        // height-100 height-200
        // font-12 字体大小
        [
            /([a-z|A-Z]+)(-)?(\d+)/,
            ([, v1, v2, v3]) => {

                if (['height', 'width', 'font'].includes(v1)) {
                    const unit = (v2 === '-' && v1 !== 'font') ? '%' : 'px';
                    const val = v3;

                    const map: Record<string, string | undefined> = {
                        font: 'font-size',
                    };

                    return {
                        [map[v1] || v1]: `${val}${unit}`,
                    };
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
    ],
});
