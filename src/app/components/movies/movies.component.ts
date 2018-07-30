import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { interval } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { MovieService } from 'app/services';
import { Page } from 'app/models/common';
import { Movie } from 'app/models/view';

@Component({
    selector: 'movies-movies',
    templateUrl: './movies.component.html',
    styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
    public pageIndex: number;
    public searchQuery: string;

    private _movies: Page<Movie>;

    constructor(
        private store: Store<any>,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private movieService: MovieService) { }

    public get movies(): Page<Movie> {
        return this._movies;
    }

    public set movies(value: Page<Movie>) {
        this._movies = value;
    }

    public mouseenter(movie: Movie) {
        if (movie.attachments.length > 1) {

            if (movie.subscription) {
                movie.subscription.unsubscribe();
                movie.subscription = null;
                movie.selectedAttachment = 0;
            }

            movie.selectedAttachment = 1;

            if (this.isVideo(movie.attachments[movie.selectedAttachment].url)) {
                return;
            }

            movie.subscription = interval(500).subscribe(() => {
                if (movie.selectedAttachment < movie.attachments.length - 1) {
                    movie.selectedAttachment++;
                } else {
                    movie.selectedAttachment = 0;
                }
            });
        }
    }

    public mouseleave(movie: Movie) {
        if (!movie.attachments.length) {
            return;
        }
        if (this.isVideo(movie.attachments[movie.selectedAttachment].url)) {
            movie.selectedAttachment = 0;
            return;
        }

        if (movie.subscription) {
            movie.subscription.unsubscribe();
            movie.subscription = null;
            movie.selectedAttachment = 0;
        }
    }

    private getMovies(pageIndex: number, searchQuery: string = null) {
        pageIndex++;

        this.movieService.getDirectMovies(pageIndex, searchQuery)
            .subscribe();
    }

    public isVideo(url: string) {
        if (url) {
            return url.endsWith('.mp4');
        }

        return false;
    }

    public trackMovie(movie: Movie) {
        return movie.id;
    }

    public changePage(pageIndex: number) {
        if (this.searchQuery) {
            this.router.navigate(['search', this.searchQuery, pageIndex]);
        } else {
            this.router.navigate(['recent', pageIndex]);
        }
    }

    public ngOnInit() {
        this.store.pipe(select('movies')).subscribe(payload => {
            if (payload && payload.movies) {
                this.movies = payload.movies;
                this.movies.total = payload.movies.pagesCount * payload.movies.data.length;
            } else if (this.movies) {
                this.movies.data = null;
            }
        });

        this.activatedRoute.paramMap.subscribe(params => {
            let pageIndex = +params.get('page');
            const searchQuery = params.get('searchQuery');

            console.log(`pageIndex: ${pageIndex}; searchQuery: ${searchQuery}`);

            this.searchQuery = searchQuery;

            if (!pageIndex) {
                pageIndex = 1;
            }

            this.pageIndex = pageIndex;
            this.getMovies(pageIndex - 1, searchQuery);
        });
    }
}
