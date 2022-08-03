import {useModel} from 'umi';
import React from 'react';
import {Button} from 'antd';
// import 'antd/es/button/style';

import yayJpg from '../assets/yay.jpg';

// export default class HomePage extends React.PureComponent {

//     componentDidMount () {
//         // console.log(getIntl());
//         // console.log(history);
//     }

//     render () {
//         // console.log(useOutletContext());

//         return (
//             <div>
//                 <h2>Yay! Welcome to umi!</h2>
//                 <p>
//                     <img src={yayJpg} width="388" />
//                 </p>
//                 <p>
//                     To get started, edit <code>pages/index.tsx</code> and save to reload.
//                 </p>
//                 <Button>123</Button>
//             </div>
//         );
//     }
// }

export default function HomePage () {
    // console.log(useOutletContext());
    const [data] = useModel('common');

    return (
        <div>
            <h2>Yay! Welcome to umi!</h2>
            <p>
                <img src={yayJpg} width="388" />
            </p>
            <p>
                To get started, edit <code>pages/index.tsx</code> and save to reload.
            </p>
            <p>{JSON.stringify(data)}</p>
            <Button>123</Button>
        </div>
    );
}
