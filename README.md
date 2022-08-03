
# 使用

- 注意看ts定义文件
- 尽量使用`hooks`编写，注意长逻辑拆分
- 部分ts定义，要通过编译一次后，才能查看
- [umi4内置api](https://umijs.org/docs/api/api#uselocation)
- [umi4运行时配置](https://umijs.org/docs/api/runtime-config)
- 使用`intl`多语言API，出现ts不提示的问题，可以手动改下
    - 1.`node_modules\@umijs\plugins\dist\locale.js` 205,206行，把输出的后缀删除掉
    - 2.重新编译一遍，就有提示了
    - 3.每次操作依赖时候，都会导致代码回滚
    - typescript 不识别带后缀文件...

## 数据流

- 使用`useModel`作为全局数据流，类组件还是需要使用dva

## 入口

- `getInitialState` 页面入口函数，文件位置`src\app.tsx`
- 页面布局参数，通过链接参数控制
    - `hideLeft === '1'` 隐藏右边模块
    - `hideTop === '1'` 隐藏顶部模块
    - `hideAll === '1'` 隐藏所有

## 权限&路由

- 嵌套路由必须以`/`开头，如果自动拼接，会导致`access`匹配不上，导致权限不足
- 路由配置关键字段`access`内容必须和`path`一致(不区分大小写)，才能起到菜单权限判断效果
- 通过`useAccess`可以获取权限数据以及判断函数，文件位置`src\access.ts`
- 如果需要对不在菜单中的页面做权限判断，可以把`access`设置为依附页面的路径
