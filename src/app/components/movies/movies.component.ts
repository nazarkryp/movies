import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MovieService } from 'app/services';
import { Page } from 'app/models/common';
import { Movie } from 'app/models/view';

@Component({
    selector: 'movies-movies',
    templateUrl: './movies.component.html',
    styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
    private pageSize = 12;
    private pageIndex: number;

    private _movies: Page<Movie>;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private movieService: MovieService) { }

    public get movies(): Page<Movie> {
        return this._movies;
    }

    public set movies(value: Page<Movie>) {
        this._movies = value;
    }

    private getMovies(pageIndex: number) {
        const offset = this.pageSize * pageIndex;

        this.movieService.getMovies(offset).subscribe(movies => {
            this.movies = movies;
        }, error => { });
    }

    public trackMovie(index: number, movie: Movie) {
        return movie.id;
    }

    public changePage(pageIndex: number) {
        this.router.navigate(['recent', pageIndex]);
    }

    public ngOnInit() {
        this.activatedRoute.paramMap.subscribe(params => {
            let pageIndex = +params.get('page');

            if (!pageIndex) {
                pageIndex = 0;
            }

            this.pageIndex = pageIndex;
            this.getMovies(pageIndex - 1);
        });
    }
}
