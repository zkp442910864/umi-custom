import React, {createContext} from "react";

export const KeepAliveContext = createContext<IKeepAliveProvider>({
    pushCacheItem: (() => {}) as any,
    removeCacheItem: (() => {}) as any,
    getCacheItem: (() => {}) as any,
    getLastCacheItem: (() => {}) as any,
});
// Context.Provider

interface IKeepAliveProvider {
    /** push dom 缓存 */
    pushCacheItem: (key: string, children: React.ReactNode, dom: HTMLDivElement, ele: React.ReactPortal) => boolean;
    /** remove dom 缓存 */
    removeCacheItem: () => void;
    /** 获取 dom 缓存 */
    getCacheItem: (key: string) => any;
    /** 获取最近一次 缓存 */
    getLastCacheItem: () => any;
}

interface IKeepAliveConsumer {
    pathKey: string;
    children: React.ReactNode;
    renderContext: React.RefObject<HTMLDivElement>;
    currentPath: string;
};

export type {
    IKeepAliveConsumer,
    IKeepAliveProvider
}
