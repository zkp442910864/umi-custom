import {useEffect} from 'react';
import {useAccess, history, useSelector, useDispatch, useModel, useLocation} from 'umi';

import {formatMessage} from '@/utils';

const Test1 = () => {

    // const store = useStore();
    const dispatch = useDispatch();
    const dvaCommon = useSelector((store: any) => store.dvaCommon);

    const [data, setData] = useModel('common');
    const local = useLocation();

    // console.log(data);

    useEffect(() => {
        console.log(local);

        dispatch({
            type: 'dvaCommon/getXxxData',
            payload: {a: 1, b: 2},
        });
        setData({sdfsdf: 3, rwer: 12});
    }, []);

    return (
        <div>
            <div className="flex f-justify-between f-items-center color-gray">
                <p className="m-b-0">This is umi docs.</p>
                <p>{JSON.stringify(dvaCommon.xxxData)}</p>
                <p>{JSON.stringify(data)}</p>
                <p className="f-1 m-b-0">{local.pathname}</p>
            </div>
            {formatMessage('navBar.lang', '')}
        </div>
    );
};

export default Test1;
