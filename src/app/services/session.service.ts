import { Injectable } from '@angular/core';

function _localStorage(): Storage {
    return localStorage;
}

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    public get(key: string) {
        return _localStorage().getItem(key);
    }

    public set(key: string, json: string) {
        _localStorage().setItem(key, json);
    }

    public removeItem(key: string) {
        _localStorage().removeItem(key);
    }

    public clear() {
        _localStorage().clear();
    }
}
