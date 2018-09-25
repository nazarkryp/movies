import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';

import { AccessToken } from 'app/models/common/token';
import { StorageService } from '../session.service';
import { TokenProvider } from '../../core/security/token.provider';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationInterceptor implements HttpInterceptor {
    constructor(
        private tokenProvider: TokenProvider) { }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const jwtToken = this.tokenProvider.getToken();

        if (!jwtToken) {
            return next.handle(req);
        }

        const request = req.clone({
            setHeaders: {
                'Authorization': `Bearer ${jwtToken}`
            }
        });

        return next.handle(request);
    }
}
