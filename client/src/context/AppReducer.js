import { USER_AUTH } from './AppActions';

export const AppReducer = (state, action) => {
    switch (action.type) {
        case USER_AUTH:
            return { ...state, isAuth: action.payload };
        default:
            throw new Error('invalid reducer action');
    }
};
