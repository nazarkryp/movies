import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'movies-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public showSearchBar: boolean;

    public showSearch() {
        this.showSearchBar = !this.showSearchBar;
    }

    public ngOnInit() {
    }
}
