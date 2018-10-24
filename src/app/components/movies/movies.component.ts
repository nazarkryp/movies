import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { MatDialog } from '@angular/material';

import { Subscription } from 'rxjs';

import { MovieService } from 'app/services';
import { Movie, Studio } from 'app/models/view';

import { MovieDialogComponent } from 'app/components/shared/movie-dialog';

import { Page } from 'app/models/common';
import { MoviesQueryFilter } from '../../models/common/movies-query-filter';

@Component({
    selector: 'movies-movies',
    templateUrl: './movies.component.html',
    styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit, OnDestroy {
    public pageIndex: number;
    public searchQuery: string;
    public movies: Page<Movie>;
    public isLoading = false;
    public studio: Studio;

    private querySubscription: Subscription;
    private movieSubscription: Subscription;

    constructor(
        private route: ActivatedRoute,
        private dialog: MatDialog,
        private router: Router,
        private movieService: MovieService) { }

    public preview(movie: Movie) {
        this.dialog.open(MovieDialogComponent, {
            maxWidth: '1230px',
            maxHeight: 'calc(100vh - 24px)',
            data: movie,
            backdropClass: 'movie-dialog-backdrop',
            panelClass: 'movie-dialog-container',
            autoFocus: false
        });
    }

    public isVideo(url: string) {
        if (url) {
            return url.endsWith('.mp4');
        }

        return false;
    }

    public trackMovie(movie: Movie) {
        return movie.movieId;
    }

    public pageChanged(pageIndex: number) {
        if (this.searchQuery) {
            // this.router.navigate(['search', this.studio.studioId, this.searchQuery, pageIndex]);
        } else {
            const extras: NavigationExtras = {
                queryParamsHandling: 'merge'
            };

            this.router.navigate(['recent', pageIndex], extras);
        }
    }

    public ngOnInit() {
        const filter = new MoviesQueryFilter();

        this.route.paramMap.subscribe(parame => {
            this.pageIndex = +parame.get('page');
            this.pageIndex = this.pageIndex ? this.pageIndex : 1;
            filter.page = this.pageIndex;
            filter.size = 24;

            if (this.querySubscription) {
                this.querySubscription.unsubscribe();
            }

            this.querySubscription = this.route.queryParamMap.subscribe(params => {
                filter.studios = params.getAll('studios').map(e => +e);
                filter.models = params.getAll('models').map(e => e);
                filter.search = params.get('search');
                filter.categories = params.getAll('categories');

                if (this.movieSubscription) {
                    this.movieSubscription.unsubscribe();
                }

                this.isLoading = true;
                this.movieSubscription = this.movieService.getMovies(filter).subscribe(movies => {
                    if (this.movies) {
                        this.movies.data = [];
                    }

                    this.movies = movies;
                    this.isLoading = false;
                }, () => { this.isLoading = false; });
            });
        });
    }

    public ngOnDestroy() {
    }
}
