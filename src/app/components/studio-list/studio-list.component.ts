import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { StudioService } from 'app/services/studio.service';

@Component({
    selector: 'movies-studio-list',
    templateUrl: './studio-list.component.html',
    styleUrls: ['./studio-list.component.scss']
})
export class StudioListComponent implements OnInit {
    public studios: Observable<any>;

    constructor(
        private studioService: StudioService
    ) { }

    public ngOnInit() {
        this.studios = this.studioService.getStudios();
    }
}
