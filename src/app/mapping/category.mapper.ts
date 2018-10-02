import { Injectable } from '@angular/core';

import { IDataResponseMapper } from './mapper';
import { CategoryResponse, DataResponse } from 'app/models/response';
import { Category } from 'app/models/view';

@Injectable({
    providedIn: 'root'
})
export class CategoryMapper implements IDataResponseMapper<CategoryResponse, Category> {
    public mapFromResponse(response: CategoryResponse): Category {
        const category = new Category();

        category.categoryId = response.categoryId;
        category.name = response.name;

        return category;
    }

    public mapFromResponseArray(categoryResponse: CategoryResponse[]): Category[] {
        return categoryResponse.map(response => this.mapFromResponse(response));
    }

    public mapFromDataResponse(categoryResponse: DataResponse<CategoryResponse>): Category[] {
        return categoryResponse.data.map(response => this.mapFromResponse(response));
    }
}
