import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';

import { AccessToken } from 'app/models/common/token';
import { StorageService } from '../session.service';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationInterceptor implements HttpInterceptor {
    constructor(
        private storageService: StorageService) { }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const accessToken = this.storageService.get('session', AccessToken);
        if (!accessToken) {
            return next.handle(req);
        }

        const request = req.clone({
            setHeaders: {
                'Authorization': `Bearer ${accessToken.jwtToken}`
            }
        });

        return next.handle(request);
    }
}
