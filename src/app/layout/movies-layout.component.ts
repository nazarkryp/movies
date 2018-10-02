import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';

import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../core/security/user.service';
import { TokenProvider } from '../core/security/token.provider';
import { Observable } from 'rxjs';


@Component({
    selector: 'movies-layout',
    templateUrl: './movies-layout.component.html',
    styleUrls: ['./movies-layout.component.scss']
})
export class MoviesLayoutComponent implements OnInit {
    public menuOpened = true;
    public menuMode = MenuMode.side;
    public currentUser: Observable<any>;

    constructor(
        private router: Router,
        private location: Location,
        private route: ActivatedRoute,
        private userService: UserService,
        private tokenProvider: TokenProvider,
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

    public ngOnInit(): void {
        this.userService.setCurrentUser();
        this.currentUser = this.userService.getCurrentUser();

        this.route.fragment.subscribe(fragment => {
            if (!fragment) {
                return;
            }

            this.tokenProvider.setToken(fragment);
            this.userService.setCurrentUser();
            const path = this.location.path(false);
            this.location.replaceState(path);
        });
    }
}

export enum MenuMode {
    side = 'side',
    push = 'push',
    over = 'over'
}
