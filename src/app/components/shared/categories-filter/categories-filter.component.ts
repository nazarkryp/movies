import { Component, OnInit } from '@angular/core';
import { NavigationExtras, ActivatedRoute, Router } from '@angular/router';
import { MatSelectionList } from '@angular/material';

import { Observable, of } from 'rxjs';
import { mergeMap, map, take } from 'rxjs/operators';

import { CategoryService } from 'app/services';
import { Category } from 'app/models/view';

@Component({
    selector: 'movies-categories-filter',
    templateUrl: './categories-filter.component.html',
    styleUrls: ['./categories-filter.component.scss']
})
export class CategoriesFilterComponent implements OnInit {
    public categories: Observable<Category[]>;

    constructor(
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private readonly categoryService: CategoryService) { }

    public selectionChange(event: MatSelectionList) {
        const values = event.selectedOptions.selected.map(item => item.value.toLowerCase());

        const extras: NavigationExtras = {
            relativeTo: this.route
        };

        extras.queryParams = { categories: values.length ? values : null };
        extras.queryParamsHandling = 'merge';
        this.router.navigate([], extras);
    }

    public ngOnInit() {
        this.categories = this.categoryService.getCategories()
            .pipe(mergeMap(categories => {
                return this.route.queryParamMap.pipe(take(1), map(params => {
                    const categoriesNames = params.getAll('categories');

                    if (categoriesNames.length && categories) {
                        categoriesNames.forEach(categoryName => {
                            const category = categories.find(e => e.name.toLowerCase() === categoryName.toLowerCase());

                            if (category) {
                                category.selected = true;
                            }
                        });
                    }

                    return categories;
                }));
            }));
    }
}
