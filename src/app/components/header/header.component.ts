import { Component, OnInit } from '@angular/core';

import { MovieService } from 'app/services';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'movies-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public showSearchBar: boolean;
    public formGroup: FormGroup;

    public get searchQuery(): FormControl {
        return this.formGroup.get('searchQuery') as FormControl;
    }

    constructor(
        private router: Router,
        private builder: FormBuilder,
        private movieService: MovieService) {
        this.formGroup = this.builder.group({
            searchQuery: new FormControl('', Validators.compose([Validators.maxLength(50)]))
        });
    }

    public showSearch() {
        this.showSearchBar = !this.showSearchBar;
    }

    public searchMovies() {
        const value = this.searchQuery.value;

        if (value) {
            this.router.navigate(['search', value, 1]);
        }
    }

    public ngOnInit() {
    }
}
