import { Reducer } from 'redux';

const initialState = {
    loading: true
};

const loadingReducer: Reducer = (state = initialState, action) => {
    switch (action.type) {
        case "CHANGE_LOADING":
            return {
                ...state,
                loading: action.loading
            }
        default:
            return state;
    }
}

export default loadingReducer