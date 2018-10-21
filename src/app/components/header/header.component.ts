import { Component, OnInit, ViewChild, ElementRef, Output, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { EventEmitter } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';

import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivationEnd, ActivatedRoute } from '@angular/router';
import { UserService } from '../../core/security/user.service';
import { SigninComponent } from '../signin/signin.component';

@Component({
    selector: 'movies-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public currentUser: any;
    public showSearchBar: boolean;
    public mobile: boolean;

    public formGroup: FormGroup;
    @ViewChild('searchInput')
    public searchInput: ElementRef<any>;

    @Output('menuOpened')
    public menuOpened = new EventEmitter();

    @Input('opened')
    public opened: boolean;

    public get searchQuery(): FormControl {
        return this.formGroup.get('searchQuery') as FormControl;
    }

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private builder: FormBuilder,
        private dialog: MatDialog,
        private breakpointObserver: BreakpointObserver,
        private userService: UserService) {
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
        // this.dialog.open(SigninComponent, {
        //     backdropClass: 'movie-dialog-backdrop',
        //     panelClass: 'movie-dialog-container',
        //     autoFocus: false
        // });
        location.href = 'https://localhost:44397/v1/account/authorize';

    }

    public signOut() {
        this.userService.signOut();
    }

    public ngOnInit() {
        this.userService.getCurrentUser().subscribe(currentUser => {
            this.currentUser = currentUser;
        });

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
    }
}
