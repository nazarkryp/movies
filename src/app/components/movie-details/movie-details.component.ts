import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MovieService } from 'app/services';
import { environment } from 'environments/environment';

@Component({
    selector: 'movies-movie-details',
    templateUrl: './movie-details.component.html',
    styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
    public movie: any;
    public directUri: any;

    constructor(
        private route: ActivatedRoute,
        private movieService: MovieService) { }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            const studio = params.get('studio');
            const movie = params.get('movie');

            this.movieService.getMovie(studio, movie)
                .subscribe(movieDetails => {
                    this.movie = movieDetails;
                    if (environment.baseAddress.includes('localhost')) {
                        this.directUri = this.movie.directUri;
                    } else {
                        this.directUri = `${environment.baseAddress}v1/movies/stream?url={{movie.directUri}}`;
                    }
                });
        });
    }
}
