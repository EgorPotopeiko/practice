import { Reducer } from 'redux';

const initialState = {
    user: {}
};

const userReducer: Reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case "USER_DATA":
            const { id, firstName, lastName, password, email, role } = action.payload;
            return {
                ...state,
                user: {
                    id,
                    firstName,
                    lastName,
                    password,
                    email,
                    role
                },
            }
        default:
            return state;
    }
}

export default userReducer