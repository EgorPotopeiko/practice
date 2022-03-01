import { Reducer } from 'redux';

const initialState = {
    role: "GUEST",
};

const roleReducer: Reducer = (state = initialState, action) => {
    switch (action.type) {
        case "USER_ROLE":
            return {
                ...state,
                role: "USER",
            }
        case "ADMIN_ROLE":
            return {
                ...state,
                role: "ADMIN",
            }
        case "GUEST_ROLE":
            return {
                ...state,
                role: "GUEST",
            }
        default:
            return state;
    }
}

export default roleReducer