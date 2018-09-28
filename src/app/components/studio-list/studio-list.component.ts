import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivationEnd, NavigationExtras } from '@angular/router';

import { Observable } from 'rxjs';

import { StudioService } from 'app/services/studio.service';
import { Studio } from 'app/models/view';
import { MatSelectionListChange, MatSelectionList } from '@angular/material';
import { UserService } from '../../core/security/user.service';

@Component({
    selector: 'movies-studio-list',
    templateUrl: './studio-list.component.html',
    styleUrls: ['./studio-list.component.scss']
})
export class StudioListComponent implements OnInit {
    public studios: Observable<any>;
    public activeStudio: Studio;
    private selectedStudios = new Array<number>();

    constructor(
        private userService: UserService,
        private router: Router,
        private route: ActivatedRoute,
        private studioService: StudioService) { }

    selectionChange(event: MatSelectionList) {
        const values = event.selectedOptions.selected.map(item => item.value);

        const extras: NavigationExtras = {
            relativeTo: this.route
        };

        if (values.length) {
            extras.queryParams = { studioId: values };
        }

        extras.queryParamsHandling = 'merge';

        this.router.navigate([], extras);
    }

    public select(studio: Studio) {
        // this.studioService.setCurrentStudio(studio);
        // this.activeStudio = studio;
        // this.router.navigate(['recent', 1]);
    }

    public ngOnInit() {
        // let currentStudio: string = null;
        // this.router.events.subscribe(event => {
        //     if (event instanceof ActivationEnd) {
        //         currentStudio = event.snapshot.paramMap.get('studio');
        //     }
        // });

        this.userService.getCurrentUser()
            .subscribe((user) => {
                this.studios = user ? this.studioService.getStudios() : null;
            });

        // this.studios.subscribe(studios => {
        //     let studio: Studio;
        //     if (currentStudio) {
        //         studio = studios.find(e => e.studioId === currentStudio);
        //     } else {
        //         studio = studios[studios.length - 1];
        //     }

        //     this.activeStudio = studio;
        //     this.studioService.setCurrentStudio(studio);

        //     if (!currentStudio) {
        //         // this.router.navigate(['recent', 1]);
        //     }
        // });
    }
}
