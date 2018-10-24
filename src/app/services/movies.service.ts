import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map, tap, finalize } from 'rxjs/operators';

import { MovieMapper, PageMapper } from 'app/mapping';
import { WebApiService } from 'app/core/communication';
import { MovieResponse } from '../models/response';
import { PageResponse } from 'app/models/response/page.response';
import { Movie } from '../models/view';
import { Page } from 'app/models/common/page';
import { MoviesQueryFilter } from 'app/models/common';
import { NgProgress } from '@ngx-progressbar/core';

@Injectable({
    providedIn: 'root'
})
export class MovieService {
    private readonly pageMapper: PageMapper<MovieResponse, Movie>;

    constructor(
        private progress: NgProgress,
        private webApiService: WebApiService,
        private movieMapper: MovieMapper) {
        this.pageMapper = new PageMapper(this.movieMapper);
    }

    //#region API Methods

    public getMovies(queryFilter: MoviesQueryFilter): Observable<Page<Movie>> {
        const requestUri = this.buildQueryString('v1/movies', queryFilter);

        this.progress.start();
        return this.webApiService.get<PageResponse<MovieResponse>>(requestUri)
            .pipe(map(response => {
                return this.pageMapper.map(response);
            }), finalize(() => {
                this.progress.complete();
            }));
    }

    public getMovie(movieId: string): Observable<any> {
        this.progress.start();
        return this.webApiService.get<MovieResponse>(`v1/movies/${movieId}`)
            .pipe(map(response => {
                return this.movieMapper.mapFromResponse(response);
            }), finalize(() => {
                this.progress.complete();
            }));
    }

    public assignMissingCategory(movieId: number, categoryId: number) {
        return this.webApiService.put<any>(`v1/movies/${movieId}/categories/${categoryId}`, null);
    }

    //#endregion

    //#region Private Methods

    private buildQueryString(requestUri: string, queryFilter: MoviesQueryFilter) {
        if (!queryFilter || !Object.keys(queryFilter).length) {
            return requestUri;
        }

        const query = Object.getOwnPropertyNames(queryFilter)
            .filter(propertyName => propertyName)
            .map(propertyName => {
                if (Array.isArray(queryFilter[propertyName])) {
                    if (!queryFilter[propertyName].length) {
                        return;
                    }

                    return queryFilter[propertyName]
                        .filter(item => item)
                        .map(item => {
                            return `${propertyName}=${item}`;
                        }).join('&');
                }

                if (queryFilter[propertyName]) {
                    return `${propertyName}=${queryFilter[propertyName]}`;
                }

                return null;
            }).filter(propertyName => propertyName).join('&');

        if (query) {
            requestUri = `${requestUri}?${query}`;
        }

        return requestUri;
    }

    //#endregion
}
