import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { Store, select } from '@ngrx/store';
import { interval, Subscription } from 'rxjs';
import { take, mergeMap, tap } from 'rxjs/operators';

import { MovieService } from 'app/services';
import { Movie, Studio } from 'app/models/view';
import { StudioPage } from 'app/models/view/studio-page';

import { MovieDialogComponent } from 'app/components/shared/movie-dialog';

import * as fromRoot from 'app/movies/infrastructure/state/reducer';

@Component({
    selector: 'movies-movies',
    templateUrl: './movies.component.html',
    styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
    public pageIndex: number;
    public searchQuery: string;
    public movies: StudioPage;
    public isLoading = false;
    public studio: Studio;

    private routeSubscription: Subscription;

    constructor(
        private dialog: MatDialog,
        private store: Store<fromRoot.MovieState>,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private movieService: MovieService) { }

    public mouseenter(movie: Movie) {
        if (movie.attachments.length > 1) {

            if (movie.subscription) {
                movie.subscription.unsubscribe();
                movie.subscription = null;
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

    public preview(movie: Movie) {
        this.dialog.open(MovieDialogComponent, {
            maxWidth: '960px',
            maxHeight: 'calc(100vh - 24px)',
            data: movie,
            panelClass: 'custom-dialog-container',
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
        return movie.objectId;
    }

    public pageChanged(pageIndex: number) {
        if (this.searchQuery) {
            this.router.navigate(['search', this.searchQuery, pageIndex]);
        } else {
            this.router.navigate([this.studio.id, 'recent', pageIndex]);
        }
    }

    public ngOnInit() {
        this.store.pipe(select(fromRoot.getMoviesPage))
            .subscribe(movies => {
                if (movies) {
                    this.movies = movies;
                    this.movies.total = movies.pagesCount * movies.data.length;
                }
            });

        this.store.pipe(select(fromRoot.getCurrentStudio))
            .subscribe(studio => {
                if (studio) {
                    this.studio = studio;
                    this.router.navigate([this.studio.id, 'recent', 1]);
                }

                if (studio && !this.routeSubscription) {
                    this.routeSubscription = this.activatedRoute.paramMap.subscribe(params => {
                        const pageIndex = +params.get('page');
                        const searchQuery = params.get('searchQuery');

                        this.searchQuery = searchQuery;
                        this.pageIndex = pageIndex ? pageIndex : 1;
                        this.getMovies(this.studio, pageIndex, searchQuery);
                    });
                }
            });
    }

    private getMovies(studio: Studio, pageIndex: number, searchQuery: string = null) {
        this.isLoading = true;

        this.movieService.getMovies({
            page: pageIndex,
            search: searchQuery,
            studio: studio.id
        }).subscribe(() => {
            this.isLoading = false;
        }, () => {
            this.isLoading = false;
        });

        // this.movieService.getMovies({
        //     page: pageIndex,
        //     search: searchQuery,
        //     studio: 'WW91cnBvcm5TZXh5'
        // }).subscribe(() => {
        //     this.isLoading = false;
        // }, () => {
        //     this.isLoading = false;
        // });
    }
}
