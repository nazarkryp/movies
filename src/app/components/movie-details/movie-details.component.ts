import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MovieService } from 'app/services';
import { Movie } from '../../models/view';
import { environment } from 'environments/environment';

@Component({
    selector: 'movies-movie-details',
    templateUrl: './movie-details.component.html',
    styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
    public movie: Movie;

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
                });
        });
    }
}
