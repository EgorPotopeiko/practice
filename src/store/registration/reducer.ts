import { Reducer } from 'redux';

const initialState = {
    newUser: {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    }
};

const registrationReducer: Reducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_FIRSTNAME":
            return {
                ...state,
                newUser: {
                    ...state.newUser,
                    firstName: action.firstName
                }
            }
        case "SET_LASTNAME":
            return {
                ...state,
                newUser: {
                    ...state.newUser,
                    lastName: action.lastName,
                }
            }
        case "SET_EMAIL":
            return {
                ...state,
                newUser: {
                    ...state.newUser,
                    email: action.email,
                }
            }
        case "SET_PASSWORD":
            return {
                ...state,
                newUser: {
                    ...state.newUser,
                    password: action.password,
                }
            }
        default:
            return state;
    }
}

export default registrationReducer