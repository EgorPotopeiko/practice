import { Reducer } from 'redux';

const initialState = {
    isAuth: false,
    email: "",
    password: ""
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
        case "SET_EMAIL":
            return {
                ...state,
                email: action.email
            }
        case "SET_PASSWORD":
            return {
                ...state,
                password: action.password
            }
        default:
            return state;
    }
}

export default authReducer