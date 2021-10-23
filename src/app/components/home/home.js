import React from 'react';
import './home.scss';

import * as userApi from '../../api/user';

const Home = () => {
    const [listUser, setListUser] = React.useState([]);

    React.useEffect(() => {
        getListUser();
    }, []);

    const getListUser = async () => {
        const users = await userApi.listUser();

        setListUser(users);
    }

    return (
        <div id="app">
            { listUser.map((v, i) => (
                <div className='user' key={i}>
                    <img src={v.avatar} className='avatar'/>

                    { v.name }
                </div>
            )) } 
        </div>
    )
}

export default Home;