import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { StudioService } from 'app/services/studio.service';
import { Studio } from '../../models/view';

@Component({
    selector: 'movies-studio-list',
    templateUrl: './studio-list.component.html',
    styleUrls: ['./studio-list.component.scss']
})
export class StudioListComponent implements OnInit {
    public studios: Observable<any>;
    public activeStudio: Studio;

    constructor(
        private studioService: StudioService
    ) { }

    public select(studio: Studio) {
        this.activeStudio = studio;
    }

    public ngOnInit() {
        this.studios = this.studioService.getStudios();
    }
}
