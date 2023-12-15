import {FC, useContext, useEffect, useLayoutEffect, useRef, useState} from "react";
import {IKeepAliveConsumer, KeepAliveContext} from "./config";
import {createPortal} from "react-dom";

const Consumer: FC<IKeepAliveConsumer> = ({
    pathKey,
    children,
    renderContext,
    currentPath,
}) => {
    const context = useContext(KeepAliveContext);
    // const dom = useRef<any>(null);
    // const [inlineChildren, setInlineChildren] = useState(null);
    const [cacheItem, setCacheItem] = useState<any>(null);
    const [uFlag, update] = useState({});

    useLayoutEffect(() => {
        const obj = context.getCacheItem(currentPath);

        if (currentPath !== pathKey || !obj) return;

        const {dom} = obj;

        setCacheItem(obj);
        renderContext.current?.appendChild(dom);

        return () => {
            renderContext.current?.removeChild(dom);
        }
    }, [currentPath, uFlag]);

    useLayoutEffect(() => {
        const dom = document.createElement('div');
        context.pushCacheItem(
            pathKey,
            children,
            dom,
            createPortal(children, dom)
        );

        update({});
    }, [pathKey]);


    return <>{cacheItem?.reactPortal}</>
}

export default Consumer;
