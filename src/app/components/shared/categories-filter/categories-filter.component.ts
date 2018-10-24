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
    public categories: Category[];

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
        this.categoryService.getCategories()
            .pipe(mergeMap(categories => {
                return this.route.queryParamMap.pipe(map(params => {
                    const categoriesNames = params.getAll('categories');

                    categories.forEach(category => {
                        category.selected = false;
                    });

                    if (categoriesNames.length && categories) {
                        categoriesNames.forEach(categoryName => {
                            let category = categories.find(e => e.name.toLowerCase() === categoryName.toLowerCase());

                            if (category) {
                                category.selected = true;
                            } else {
                                category = new Category();
                                category.name = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
                                category.selected = true;
                                categories.unshift(category);
                            }
                        });
                    }

                    return categories;
                }));
            }))
            .subscribe(categories => {
                this.categories = categories;
            });
    }
}
