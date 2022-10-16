import Config from 'webpack-chain';

// https://github.com/neutrinojs/webpack-chain
const fn = (memo: Config, args: any) => {

    // memo.entry('').add
    // memo.module.rule
    // memo.plugin().use

    // memo.resolve.alias.set('foo', '/tmp/to/foo');

    // 查看分析内部依赖情况
    // memo.optimization.providedExports(false);

};

export default fn;
