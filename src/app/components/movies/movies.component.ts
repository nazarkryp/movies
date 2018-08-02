import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { interval } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { MovieService } from 'app/services';
import { Page } from 'app/models/common';
import { Movie } from 'app/models/view';
import { StudioPage } from 'app/models/view/studio-page';

import * as fromRoot from '../../movies/infrastructure/state/reducer';

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

    constructor(
        private store: Store<any>,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private movieService: MovieService) { }

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

    public isVideo(url: string) {
        if (url) {
            return url.endsWith('.mp4');
        }

        return false;
    }

    public trackMovie(movie: Movie) {
        return movie.id;
    }

    public pageChanged(pageIndex: number) {
        if (this.searchQuery) {
            this.router.navigate(['search', this.searchQuery, pageIndex]);
        } else {
            this.router.navigate(['recent', pageIndex]);
        }
    }

    public ngOnInit() {
        this.store.pipe(select(fromRoot.getMoviesPage)).subscribe(movies => {
            if (movies) {
                this.movies = movies;
                this.movies.total = movies.pagesCount * movies.data.length;
            }
        });

        this.activatedRoute.paramMap.subscribe(params => {
            const pageIndex = +params.get('page');
            const searchQuery = params.get('searchQuery');

            this.searchQuery = searchQuery;
            this.pageIndex = pageIndex ? pageIndex : 1;
            this.getMovies(pageIndex, searchQuery);
        });
    }

    private getMovies(pageIndex: number, searchQuery: string = null) {
        this.isLoading = true;
        this.movieService.getMovies({
            page: pageIndex,
            search: searchQuery,
            studio: 'WW91cnBvcm5TZXh5'
        }).subscribe(() => {
            window.scrollTo(0, 0);
            this.isLoading = false;
        }, () => {
            this.isLoading = false;
        });
    }
}
