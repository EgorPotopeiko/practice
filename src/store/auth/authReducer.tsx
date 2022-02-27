import { Reducer } from 'redux';

const initialState = {
    isAuth: false,
};

const authReducer: Reducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                isAuth: true,
            }
        case "LOGOUT":
            return {
                ...state,
                isAuth: false
            }
        default:
            return state;
    }
}

export default authReducer