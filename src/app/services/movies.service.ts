import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';

import { MovieMapper, PageMapper, StudioMapper } from 'app/mapping';
import { WebApiService } from 'app/core/communication';
import { MovieResponse } from 'app/models/response';
import { Movie } from 'app/models/view/movie';
import { Page } from 'app/models/common';
import { StudioPageMapper } from '../mapping/studio-page.mapper';
import { StudioPageResponse } from '../models/response/studio-page';
import { Store } from '@ngrx/store';
import { MovieAction } from 'app/movies/infrastructure/state';

@Injectable({
    providedIn: 'root'
})
export class MovieService {
    private readonly pageMapper: StudioPageMapper;

    constructor(
        private store: Store<any>,
        private webApiService: WebApiService,
        private movieMapper: MovieMapper,
        private studioMapper: StudioMapper) {
        this.pageMapper = new StudioPageMapper(this.movieMapper, this.studioMapper);
    }

    public getDirectMovies(page: number, searchQuery: string = null): Observable<Page<Movie>> {
        if (!page) {
            page = 1;
        }

        let requestUri = `v1/movies/WW91cnBvcm5TZXh5?page=${page}`;

        if (searchQuery) {
            requestUri = `v1/movies/WW91cnBvcm5TZXh5?page=${page}&search=${searchQuery}`;
        }

        this.store.dispatch({ type: MovieAction.SET_MOVIES, payload: null });
        return this.webApiService.get<StudioPageResponse>(requestUri)
            .pipe(
                map(response => this.pageMapper.map(response)),
                tap(movies => {
                    this.store.dispatch({
                        type: MovieAction.SET_MOVIES,
                        payload: movies
                    });
                }));
    }

    public getMovie(studio: string, movie: string): Observable<any> {
        return this.webApiService.get<any>(`v1/movies/${studio}/${movie}`);
    }
}
