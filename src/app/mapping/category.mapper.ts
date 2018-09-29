import { Injectable } from '@angular/core';

import { IMapper } from './mapper';
import { CategoryResponse } from 'app/models/response';
import { Category } from 'app/models/view';


@Injectable({
    providedIn: 'root'
})
export class CategoryMapper implements IMapper<CategoryResponse, Category> {
    public mapFromResponse(response: CategoryResponse): Category {
        const category = new Category();

        category.categoryId = response.categoryId;
        category.name = response.name;

        return category;
    }

    public mapFromResponseArray(categoryResponse: CategoryResponse[]): Category[] {
        return categoryResponse.map(response => this.mapFromResponse(response));
    }
}
