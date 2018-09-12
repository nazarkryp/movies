import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { URLSearchParams } from '@angular/http';

@Component({
    selector: 'movies-layout',
    templateUrl: './movies-layout.component.html',
    styleUrls: ['./movies-layout.component.scss']
})
export class MoviesLayoutComponent implements OnInit {
    public menuOpened = true;
    public menuMode = MenuMode.side;

    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private breakpointObserver: BreakpointObserver) {
        this.breakpointObserver.observe(['(min-width: 1200px)'])
            .subscribe(state => {
                this.menuOpened = state.matches;
                this.menuMode = state.matches ? MenuMode.side : MenuMode.over;
            });
    }

    public openMenu() {
        this.menuOpened = !this.menuOpened;
    }

    ngOnInit(): void {
        this.route.fragment.subscribe(fragment => {
            if (!fragment) {
                return;
            }

            const params: { [key: string]: string } = {};

            fragment.split('&').forEach(e => {
                params[e.split('=')[0]] = e.split('=')[1];
            });

            console.log(params['id_token']);

        });
    }
}

export enum MenuMode {
    side = 'side',
    push = 'push',
    over = 'over'
}
