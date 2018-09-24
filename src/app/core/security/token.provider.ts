import { Injectable } from '@angular/core';

import { environment } from 'environments/environment';

import { StorageService } from '../../services/session.service';

@Injectable({
    providedIn: 'root'
})
export class TokenProvider {
    private get jwtKey(): string {
        return 'jwt';
    }

    constructor(
        private storageService: StorageService) {
    }

    public authorize() {
        location.href = environment.loginUrl;
    }

    public retrieveSession() {
        let result = null;

        const jwt = this.storageService.get(this.jwtKey);

        if (jwt) {
            result = this.parseJwt(jwt);
        }

        return result;
    }

    public setToken(fragment: string) {
        const tokenKey = 'token';
        const jwt = this.parseParameters(fragment, tokenKey);

        if (!jwt) {
            throw new Error(`Key '${tokenKey}'not found`);
        }

        this.storageService.set(this.jwtKey, jwt);
    }

    private parseJwt(token: string) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');

        return JSON.parse(window.atob(base64));
    }

    private parseParameters(url: string, key: string) {
        const vars = url.split('&');

        for (let i = 0; i < vars.length; i++) {
            const keyValuePair = vars[i].split('=');
            if (decodeURIComponent(keyValuePair[0]) === key) {
                return decodeURIComponent(keyValuePair[1]);
            }
        }

        return null;
    }
}
