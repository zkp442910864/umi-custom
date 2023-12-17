import React, {createContext} from "react";

export const KeepAliveContext = createContext<IKeepAliveProvider>({
    pushCacheItem: (() => {}) as any,
    removeCacheItem: (() => {}) as any,
    getCacheItem: (() => {}) as any,
    getLastCacheItem: (() => {}) as any,
    getRenderContext: (() => {}) as any,
});
// Context.Provider

interface IKeepAliveProvider {
    /** push dom 缓存 */
    pushCacheItem: (key: string, children: React.ReactNode, dom: HTMLDivElement, ele: React.ReactPortal) => boolean;
    /** remove dom 缓存 */
    removeCacheItem: (key: string) => void;
    /** 获取 dom 缓存 */
    getCacheItem: (key: string) => any;
    /** 获取最近一次 缓存 */
    getLastCacheItem: () => any;
    /** 获取渲染容器 */
    getRenderContext: () => React.RefObject<HTMLDivElement>;
}

interface IKeepAliveConsumer {
    pathKey: string;
    children: React.ReactNode;
    currentPath: string;
};

export type {
    IKeepAliveConsumer,
    IKeepAliveProvider
}
