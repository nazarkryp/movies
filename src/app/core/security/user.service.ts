import { Injectable } from '@angular/core';

import { Store, select } from '@ngrx/store';

import * as fromRoot from './state';
import { tap, map } from 'rxjs/operators';
import { TokenProvider } from './token.provider';
import { UserActions } from './state/user.action';
import { Observable } from 'rxjs';
import { User } from './models';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(
        private tokenProvider: TokenProvider,
        private store: Store<fromRoot.UserState>) {
    }

    public getCurrentUser(): Observable<User> {
        return this.store.pipe(select('user'), map(e => e.user));
    }

    public setCurrentUser() {
        const jwt = this.tokenProvider.getToken();

        if (jwt) {
            const user = this.tokenProvider.parseJwt(jwt);
            this.store.dispatch({
                type: UserActions.SET_USER,
                payload: user
            });
        }
    }

    public signOut() {
        this.tokenProvider.removeToken();

        this.store.dispatch({
            type: UserActions.REMOVE_USER
        });
    }
}
