import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { StudioService } from 'app/services/studio.service';
import { Studio } from 'app/models/view';

@Component({
    selector: 'movies-studio-list',
    templateUrl: './studio-list.component.html',
    styleUrls: ['./studio-list.component.scss']
})
export class StudioListComponent implements OnInit {
    public studios: Observable<Studio[]>;
    public activeStudio: Studio;

    constructor(
        private studioService: StudioService
    ) { }

    public select(studio: Studio) {
        this.studioService.setCurrentStudio(studio);
        this.activeStudio = studio;
    }

    public ngOnInit() {
        this.studios = this.studioService.getStudios();

        this.studios.subscribe(studios => {
            const lastStudio = studios[studios.length - 1];
            this.activeStudio = lastStudio;
            this.studioService.setCurrentStudio(lastStudio);
        });
    }
}
