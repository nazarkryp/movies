import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { MovieMapper, PageMapper, StudioMapper } from 'app/mapping';
import { WebApiService } from 'app/core/communication';
import { MovieResponse } from 'app/models/response';
import { Movie } from 'app/models/view/movie';
import { Page } from 'app/models/common';
import { StudioPageMapper } from '../mapping/studio-page.mapper';
import { StudioPageResponse } from '../models/response/studio-page';
import { Stream } from 'stream';

@Injectable({
    providedIn: 'root'
})
export class MovieService {
    private readonly pageMapper: StudioPageMapper;

    constructor(
        private client: HttpClient,
        private webApiService: WebApiService,
        private movieMapper: MovieMapper,
        private studioMapper: StudioMapper) {
        this.pageMapper = new StudioPageMapper(this.movieMapper, this.studioMapper);
    }

    public getDirectMovies(page: number): Observable<Page<Movie>> {
        if (!page) {
            page = 1;
        }

        const requestUri = `v1/movies/WW91cnBvcm5TZXh5?page=${page}`;

        return this.webApiService.get<StudioPageResponse>(requestUri)
            .pipe(map(response => this.pageMapper.map(response)));
    }

    public getMovie(studio: string, movie: string): Observable<any> {
        return this.webApiService.get<any>(`v1/movies/${studio}/${movie}`);
    }

    // public parse() {
    //     return this.client.get<string>('https://yourporn.sexy/post/5b504285ff492.html')
    //         .pipe(mergeMap(html => {
    //             const parseObject = {
    //                 html: html,
    //                 studio: 'WW91cnBvcm5TZXh5'
    //             };

    //             return this.client.post('http://movie-api.azurewebsites.net/v1/movies/parse', parseObject);
    //         }));
    // }
}
