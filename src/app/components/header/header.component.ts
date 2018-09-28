import { Component, OnInit, ViewChild, ElementRef, Output } from '@angular/core';

import { MovieService } from 'app/services';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivationEnd, ActivatedRoute } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Store } from '@ngrx/store';
import { MovieState, getCurrentStudio } from '../../movies/infrastructure/state';
import { select } from '@ngrx/store';
import { Studio } from '../../models/view';
import { UserService } from '../../core/security/user.service';
import { User } from '../../core/security/models';

@Component({
    selector: 'movies-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    private currentUser: User;
    private studio: Studio;

    public showSearchBar: boolean;
    public mobile: boolean;

    public formGroup: FormGroup;
    @ViewChild('searchInput')
    public searchInput: ElementRef<any>;

    @Output('menuOpened')
    public menuOpened = new EventEmitter();

    public get searchQuery(): FormControl {
        return this.formGroup.get('searchQuery') as FormControl;
    }

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private builder: FormBuilder,
        private breakpointObserver: BreakpointObserver,
        private store: Store<MovieState>,
        private userService: UserService,
        private movieService: MovieService) {
        this.formGroup = this.builder.group({
            searchQuery: new FormControl('', Validators.compose([Validators.maxLength(50)]))
        });

        this.breakpointObserver.observe(['(max-width: 500px)'])
            .subscribe(state => {
                this.mobile = state.matches;
            });
    }

    public showMenu() {
        this.menuOpened.next();
    }

    public showSearch() {
        this.showSearchBar = !this.showSearchBar;

        if (this.showSearchBar) {
            this.searchInput.nativeElement.focus();
        }
    }

    public searchMovies() {
        if (this.searchQuery.value) {
            this.router.navigate([], {
                relativeTo: this.route,
                queryParams: {
                    search: this.searchQuery.value
                },
                queryParamsHandling: 'merge'
            });
        }
    }

    public searchFocusLost() {
        if (!this.formGroup.get('searchQuery').value) {
            // this.showSearchBar = false;
        }
    }

    public signIn() {
        location.href = 'https://localhost:44397/v1/account/authorize';
    }

    public signOut() {
        this.userService.signOut();
    }

    public ngOnInit() {
        this.router.events.subscribe(event => {
            if (event instanceof ActivationEnd) {
                const search = event.snapshot.paramMap.get('searchQuery');

                if (!search) {
                    this.formGroup.get('searchQuery').setValue('');
                    this.showSearchBar = false;
                } else {
                    this.formGroup.get('searchQuery').setValue(search);
                    this.showSearchBar = true;
                }
            }
        });

        this.store.pipe(select(getCurrentStudio))
            .subscribe((studio) => {
                this.studio = studio;
            });

        this.userService.getCurrentUser().subscribe((currentUser) => {
            this.currentUser = currentUser;
        });
    }
}
