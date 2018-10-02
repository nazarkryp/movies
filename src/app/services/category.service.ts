import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { WebApiService } from 'app/core/communication';
import { CategoryMapper } from 'app/mapping';
import { DataResponse, CategoryResponse } from 'app/models/response';
import { Category } from 'app/models/view';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    constructor(
        private categoryMapper: CategoryMapper,
        private webApiService: WebApiService) { }

    public getCategories(): Observable<Category[]> {
        return this.webApiService.get<DataResponse<CategoryResponse>>('v1/categories')
            .pipe(map(response => this.categoryMapper.mapFromDataResponse(response)));
    }
}
