import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';

import { interval } from 'rxjs';

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


    constructor(
        private route: ActivatedRoute,
        private dialog: MatDialog,
        private router: Router,
        private movieService: MovieService) { }

    public mouseenter(movie: Movie) {
        if (movie.attachments.length > 1) {

            if (movie.subscription) {
                movie.subscription.unsubscribe();
                movie.subscription = null;
            }

            movie.selectedAttachment = 1;

            if (this.isVideo(movie.attachments[movie.selectedAttachment].uri)) {
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
        if (this.isVideo(movie.attachments[movie.selectedAttachment].uri)) {
            movie.selectedAttachment = 0;
            return;
        }

        if (movie.subscription) {
            movie.subscription.unsubscribe();
            movie.subscription = null;
            movie.selectedAttachment = 0;
        }
    }

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
            this.router.navigate(['recent', pageIndex]);
        }
    }

    public ngOnInit() {
        const filter = new MoviesQueryFilter();

        this.route.paramMap.subscribe(parame => {
            this.pageIndex = +parame.get('page');
            this.pageIndex = this.pageIndex ? this.pageIndex : 1;
            filter.page = this.pageIndex;
            filter.size = 24;

            if (this.movies) {
                this.movies.data = [];
            }

            this.route.queryParamMap.subscribe(params => {
                filter.studioId = params.getAll('studioId').map(e => +e);
                filter.search = params.get('search');

                this.movieService.getMovies(filter).subscribe(movies => {
                    this.movies = movies;
                });
            });
        });
    }

    public ngOnDestroy() {
    }
}
