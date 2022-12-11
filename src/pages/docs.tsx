import {useEffect} from 'react';
import {useAccess, useModel} from 'umi';

import {formatMessage} from '@/utils';

const DocsPage = () => {

    // const store = useStore();

    const [data, setData] = useModel('common');

    // console.log(data);

    useEffect(() => {
        setData({sdfsdf: 3, rwer: 12});
    }, []);

    return (
        <div>
            <p>This is umi docs.</p>
            <p>{JSON.stringify(data)}</p>
            {formatMessage('navBar.lang', '')}
        </div>
    );
};

export default DocsPage;
