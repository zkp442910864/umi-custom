import {useEffect} from 'react';
import {useAccess, useStore, useSelector, useDispatch, useModel} from 'umi';

import {formatMessage} from '@/utils';

const DocsPage = () => {

    // const store = useStore();
    const dispatch = useDispatch();
    const dvaCommon = useSelector((store: any) => store.dvaCommon);

    const [data, setData] = useModel('common');

    // console.log(data);

    useEffect(() => {
        dispatch({
            type: 'dvaCommon/getXxxData',
            payload: {a: 1, b: 2},
        });
        setData({sdfsdf: 3, rwer: 12});
    }, []);

    return (
        <div>
            <p>This is umi docs.</p>
            <p>{JSON.stringify(dvaCommon.xxxData)}</p>
            <p>{JSON.stringify(data)}</p>
            {formatMessage('navBar.lang', '')}
        </div>
    );
};

export default DocsPage;
