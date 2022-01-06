import React, { useReducer } from 'react';
import AppContext from './AppContext';
import { AppReducer } from './AppReducer';
import { USER_AUTH } from './AppActions';

function AppState({ children }) {
    const initialState = {
        username: 'deboer',
        isAuth: false,
    };

    const [state, dispatch] = useReducer(AppReducer, initialState);

    // auth/unauth user
    const setUserAuth = (authStatus) => {
        dispatch({ type: USER_AUTH, payload: authStatus });
    };

    return (
        <AppContext.Provider
            value={{
                state,
                setUserAuth,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export default AppState;
