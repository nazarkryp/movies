import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';

import { MovieService } from 'app/services';
import { Movie } from 'app/models/view';
import { environment } from 'environments/environment';
import { MoviesQueryFilter, Page } from 'app/models/common';

@Component({
    selector: 'movies-movie-details',
    templateUrl: './movie-details.component.html',
    styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
    public movie: Movie;
    public relatedMovies: Observable<Page<Movie>>;

    public title = environment.title;
    public uri = environment.uri;

    constructor(
        private route: ActivatedRoute,
        private movieService: MovieService) { }

    public ngOnInit() {
        this.route.paramMap.subscribe(params => {
            const movieId = params.get('movieId');

            this.movieService.getMovie(movieId)
                .subscribe(movieDetails => {
                    this.movie = movieDetails;
                    this.getRelatedMovies(this.movie.models.map(e => e.modelId));
                });
        });
    }

    private getRelatedMovies(models: number[]) {
        if (models.length) {
            const filter = new MoviesQueryFilter();
            filter.models = [models[0]];
            this.relatedMovies = this.movieService.getMovies(filter);
        }
    }
}
