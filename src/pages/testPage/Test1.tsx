import {useEffect} from 'react';
import {useAccess, history, useSelector, useDispatch, useModel, useLocation} from 'umi';

import {formatMessage} from '@/utils/intlUtils';

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
            <p>This is umi docs.</p>
            <p>{JSON.stringify(dvaCommon.xxxData)}</p>
            <p>{JSON.stringify(data)}</p>
            <p>{local.pathname}</p>
            {formatMessage('navBar.lang', '')}
        </div>
    );
};

export default Test1;
