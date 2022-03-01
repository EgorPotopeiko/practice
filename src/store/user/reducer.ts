import { Reducer } from 'redux';

const initialState = {
    user: {
        role: "guest"
    }
};

const userReducer: Reducer = (state = initialState, action: any) => {
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