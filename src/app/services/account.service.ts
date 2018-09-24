import { WebApiService } from '../core/communication';

import { Observable } from 'rxjs';

export class AccountService {
    constructor(
        private webApiService: WebApiService) { }

    public getAccount(): Observable<any> {
        return this.webApiService.get('v1/account');
    }
}
