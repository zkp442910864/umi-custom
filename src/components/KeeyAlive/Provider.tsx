import React, {FC, useRef} from "react";
import {IKeepAliveProvider, KeepAliveContext} from "./config";


const Provider: FC<{children: React.ReactNode}> = ({children}) => {

    const cache = useRef<any>({});

    const {current: value} = useRef<IKeepAliveProvider>({
        pushCacheItem: (pathKey, children, dom, reactPortal) => {
            // console.log('pushCacheItem')
            let flag = false;
            if (!cache.current[pathKey]) {
                flag = true;
                cache.current[pathKey] = {
                    children,
                    dom,
                    pathKey,
                    reactPortal,
                    index: 0,
                }
            }

            cache.current[pathKey].index++;
            // console.log(cache);
            // showCache.current = cache.current[pathKey];
            // update({});
            return flag;
        },
        removeCacheItem: () => {},
        getCacheItem: (pathKey) => {
            return cache.current[pathKey];
        },
        getLastCacheItem: () => {},
    })


    return (
        <KeepAliveContext.Provider
            value={value}
        >
            {children}
        </KeepAliveContext.Provider>
    )
};

export default Provider;
