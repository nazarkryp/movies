import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras, ActivationEnd } from '@angular/router';

import { Observable } from 'rxjs';

import { StudioService } from 'app/services/studio.service';
import { Studio } from 'app/models/view';
import { MatSelectionList } from '@angular/material';
import { UserService } from '../../core/security/user.service';
import { mergeMap, map, take } from 'rxjs/operators';

@Component({
    selector: 'movies-studios-filter',
    templateUrl: './movies-studios-filter.component.html',
    styleUrls: ['./movies-studios-filter.component.scss']
})
export class StudioListComponent implements OnInit {
    public studios: Observable<Studio[]>;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private studioService: StudioService) { }

    public selectionChange(event: MatSelectionList) {
        const values = event.selectedOptions.selected.map(item => item.value);
        const extras: NavigationExtras = {
            relativeTo: this.route
        };

        extras.queryParams = { studios: values.length ? values : null };
        extras.queryParamsHandling = 'merge';
        this.router.navigate([], extras);
    }

    public ngOnInit() {
        this.studios = this.studioService.getStudios()
            .pipe(mergeMap(studios => {
                return this.route.queryParamMap.pipe(take(1), map(params => {
                    const studiosIds = params.getAll('studios');

                    if (studiosIds.length && studios) {
                        studiosIds.forEach(studioId => {
                            const studio = studios.find(e => e.studioId === +studioId);

                            if (studio) {
                                studio.selected = true;
                            }
                        });
                    }

                    return studios;
                }));
            }));
    }
}
