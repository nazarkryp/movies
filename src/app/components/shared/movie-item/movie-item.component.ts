import { Component, OnInit, Input } from '@angular/core';

import { Movie } from 'app/models/view';

@Component({
    selector: 'movies-movie-item',
    templateUrl: './movie-item.component.html',
    styleUrls: ['./movie-item.component.scss']
})
export class MovieItemComponent implements OnInit {
    @Input('movie')
    public movie: Movie;

    public ngOnInit() {
    }
}
