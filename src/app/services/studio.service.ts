import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { WebApiService } from 'app/core/communication';

@Injectable({
    providedIn: 'root'
})
export class StudioService {
    constructor(
        private webApiService: WebApiService) { }

    public getStudios(): Observable<any> {
        return this.webApiService.get('v1/studios');
    }
}
