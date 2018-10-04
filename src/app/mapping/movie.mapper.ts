import { Injectable } from '@angular/core';

import { IMapper } from './mapper';
import { AttachmentMapper } from './attachment.mapper';
import { StudioMapper } from './studio.mapper';
import { MovieResponse } from 'app/models/response';
import { Movie } from 'app/models/view';
import { CategoryMapper } from './category.mapper';
import { ModelMapper } from './model.mapper';

@Injectable({
    providedIn: 'root'
})
export class MovieMapper implements IMapper<MovieResponse, Movie> {
    constructor(
        private readonly attachmentMapper: AttachmentMapper,
        private readonly categoryMapper: CategoryMapper,
        private readonly modelMapper: ModelMapper,
        private readonly studioMapper: StudioMapper) { }

    public mapFromResponse(response: MovieResponse): Movie {
        const movie = new Movie();

        movie.movieId = response.movieId;
        movie.description = response.description;
        movie.date = response.date;
        movie.uri = response.uri;
        movie.duration = response.duration;

        if (response.models) {
            movie.models = this.modelMapper.mapFromResponseArray(response.models);
        }

        if (response.studio) {
            movie.studio = this.studioMapper.mapFromResponse(response.studio);
        }

        if (response.categories) {
            movie.categories = this.categoryMapper.mapFromResponseArray(response.categories);
        }

        movie.attachments = this.attachmentMapper.mapFromResponseArray(response.attachments);
        movie.title = response.title;

        return movie;
    }

    public mapFromResponseArray(moviesResponse: MovieResponse[]): Movie[] {
        return moviesResponse.map(response => this.mapFromResponse(response));
    }
}
