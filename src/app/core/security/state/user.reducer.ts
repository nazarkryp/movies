import { UserActions } from './user.action';
import { User } from 'app/core/security/models';

export interface UserState {
    user: User;
}

const initialState: UserState = {
    user: null
};

export function userReducer(state: UserState = initialState, action): UserState {
    switch (action.type) {
        case UserActions.SET_USER:
            return {
                ...state,
                user: action.payload
            };
        case UserActions.REMOVE_USER:
            return {
                ...state,
                user: null
            };
        default:
            return state;
    }
}
