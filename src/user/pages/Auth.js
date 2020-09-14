import React, { useContext } from 'react';
import { AuthContext } from '../../shared/context/auth-context';
import {useHistory } from 'react-router-dom';

const Auth = (props) => {
    const auth = useContext(AuthContext);
    const history = useHistory()

    const authSubmitHandler = async (event) => {
        event.preventDefault();
        auth.login('userId1', 'token');
        // console.log(history)
        history.push('/')
    }



    return(
        <div>
            <h1>LOGIN PAGE</h1>
            <hr/>
            <form onSubmit={authSubmitHandler}>
                <button>LOGIN</button>
            </form>
        </div>
    )
};

export default Auth;