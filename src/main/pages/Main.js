import React, {useContext} from 'react'
import { AuthContext } from '../../shared/context/auth-context';

const Main = (props) => {
    const auth = useContext(AuthContext);
    return(
        <div>
            <h1>PROTECTED PAGE</h1>
            <hr/>
            <button onClick={() => {
                auth.logout()
            }}>
                LOGOUT
            </button>
        </div>
    )
}

export default Main