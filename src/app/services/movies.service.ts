import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { MovieMapper, PageMapper } from 'app/mapping';
import { WebApiService } from 'app/core/communication';
import { MovieResponse } from 'app/models/response';
import { Movie } from 'app/models/view/movie';
import { Page } from 'app/models/common';

@Injectable({
    providedIn: 'root'
})
export class MovieService {
    private readonly pageMapper: PageMapper<MovieResponse, Movie>;

    constructor(
        private client: HttpClient,
        private webApiService: WebApiService,
        private movieMapper: MovieMapper) {
        this.pageMapper = new PageMapper<MovieResponse, Movie>(this.movieMapper);
    }

    public getMovies(offset: number): Observable<Page<Movie>> {
        return this.client.get<Page<MovieResponse>>(`http://localhost:4200/assets/json/source.json`)
            .pipe(map(response => this.pageMapper.map(response)));
        // return this.webApiService.get<Page<MovieResponse>>(`v1/movies?offset=${offset}`)
        //     .pipe(map(response => this.pageMapper.map(response)));
    }
}
