import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { MovieMapper, StudioMapper, PageMapper } from 'app/mapping';
import { WebApiService } from 'app/core/communication';
import { QueryFilter } from 'app/models/common/query-filter';
import { MovieResponse } from '../models/response';
import { PageResponse } from 'app/models/response/page';
import { Movie } from '../models/view';
import { Page } from 'app/models/common/page';

@Injectable({
    providedIn: 'root'
})
export class MovieService {
    private readonly pageMapper: PageMapper<MovieResponse, Movie>;

    constructor(
        private webApiService: WebApiService,
        private movieMapper: MovieMapper) {
        this.pageMapper = new PageMapper(this.movieMapper);
    }

    public getMovies(queryFilter: QueryFilter): Observable<Page<Movie>> {
        const requestUri = this.buildQueryString('v1/movies', queryFilter);

        return this.webApiService.get<PageResponse<MovieResponse>>(requestUri)
            .pipe(map(page => {
                return this.pageMapper.map(page);
            }));
    }

    public getMovie(studio: string, movie: string): Observable<any> {
        return this.webApiService.get<any>(`v1/movies/${studio}/${movie}`);
    }

    private buildQueryString(requestUri: string, query: QueryFilter) {
        if (!query || !Object.keys(query).length) {
            return requestUri;
        }

        const queryString = Object.keys(query).map(key => key + '=' + query[key]).join('&');

        if (queryString) {
            requestUri = `${requestUri}?${queryString}`;
        }

        return requestUri;
    }
}
