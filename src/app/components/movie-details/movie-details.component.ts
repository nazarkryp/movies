import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';

import { Observable } from 'rxjs';

import { MovieService } from 'app/services';
import { Movie, Attachment } from 'app/models/view';
import { environment } from 'environments/environment';
import { MoviesQueryFilter, Page } from 'app/models/common';
import { PreviewComponent } from '../shared/preview/preview.component';

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
        private dialog: MatDialog,
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

    public preview(index: number) {
        this.dialog.open(PreviewComponent, {
            maxWidth: '1230px',
            maxHeight: 'calc(100vh - 24px)',
            data: {
                attachments: this.movie.attachments,
                selectedAttachment: index
            },
            backdropClass: 'movie-dialog-backdrop',
            panelClass: 'movie-dialog-container',
            autoFocus: false
        });
    }

    private getRelatedMovies(models: number[]) {
        if (models.length) {
            const filter = new MoviesQueryFilter();
            filter.size = 12;
            filter.models = [models[0]];
            this.relatedMovies = this.movieService.getMovies(filter);
        }
    }
}
