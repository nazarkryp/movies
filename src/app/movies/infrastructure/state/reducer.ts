import { MovieAction } from './action';

export function reducer(state, action) {
    switch (action.type) {
        case MovieAction.SET_MOVIES:
            return {
                ...state,
                movies: action.payload
            };
        case MovieAction.CLEAN_MOVIES:
            return {
                state,
                movies: null
            };
        default:
            return state;
    }
}
