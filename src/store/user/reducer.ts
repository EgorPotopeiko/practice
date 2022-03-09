import { Reducer } from 'redux';

const initialState = {
    user: JSON.parse(localStorage.getItem("user")!) || {
        role: 'guest',
        isAuth: false
    }
};

const userReducer: Reducer = (state = initialState, action) => {
    switch (action.type) {
        case "USER_DATA":
            return {
                ...state,
                user: action.authUser
            }
        default:
            return state;
    }
}

export default userReducer