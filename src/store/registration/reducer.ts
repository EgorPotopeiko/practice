import { Reducer } from 'redux';

const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
};

const registrationReducer: Reducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_FIRSTNAME":
            return {
                ...state,
                firstName: action.firstName,
            }
        case "SET_LASTNAME":
            return {
                ...state,
                lastName: action.lastName,
            }
        case "SET_EMAIL":
            return {
                ...state,
                email: action.email,
            }
        case "SET_PASSWORD":
            return {
                ...state,
                password: action.password,
            }
        default:
            return state;
    }
}

export default registrationReducer