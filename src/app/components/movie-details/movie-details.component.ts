import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MovieService } from 'app/services';

@Component({
    selector: 'movies-movie-details',
    templateUrl: './movie-details.component.html',
    styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
    public movie: any;

    constructor(
        private route: ActivatedRoute,
        private movieService: MovieService) { }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            const identifier = params.get('movieId');

            this.movieService.getMovie(identifier)
                .subscribe(movie => {
                    this.movie = movie;
                });
        });
    }
}
