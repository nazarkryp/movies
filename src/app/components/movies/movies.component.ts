import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { interval, Subscription } from 'rxjs';

import { MovieService } from 'app/services';
import { Page } from 'app/models/common';
import { Movie } from 'app/models/view';

@Component({
    selector: 'movies-movies',
    templateUrl: './movies.component.html',
    styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
    private pageSize = 12;
    public pageIndex: number;

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

    private intervalSubscription: Subscription;
    public mouseenter(movie: Movie) {
        if (movie.attachments.length > 1) {
            movie.selectedAttachment = 1;
            this.intervalSubscription = interval(500).subscribe(() => {
                if (movie.selectedAttachment < movie.attachments.length - 1) {
                    movie.selectedAttachment++;
                } else {
                    movie.selectedAttachment = 0;
                }
            });
        }
    }

    public mouseleave(movie: Movie) {
        if (movie.attachments.length > 1) {
            this.intervalSubscription.unsubscribe();

            movie.selectedAttachment = 0;
        }
    }

    private getMovies(pageIndex: number) {
        const offset = this.pageSize * pageIndex;

        this.movieService.getMovies(offset).subscribe(movies => {
            this.movies = movies;
        }, () => { });
    }

    public trackMovie(movie: Movie) {
        return movie.id;
    }

    public changePage(pageIndex: number) {
        this.router.navigate(['recent', pageIndex]);
    }

    public ngOnInit() {
        this.activatedRoute.paramMap.subscribe(params => {
            let pageIndex = +params.get('page');

            if (!pageIndex) {
                pageIndex = 1;
            }

            this.pageIndex = pageIndex;
            this.getMovies(pageIndex - 1);
        });
    }
}
