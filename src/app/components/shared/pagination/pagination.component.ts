import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { Page } from 'app/models/common';

@Component({
    selector: 'movies-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent implements OnInit {
    private maxPages: number;

    @Input() public pageSize: number;
    @Input() public total: number;
    @Input() public currentPage: number;
    @Output() public changed = new EventEmitter<number>();
    public pages: number[];
    public range: number;

    constructor(private router: Router) {
        this.maxPages = 10;
        this.range = 2;
    }

    public showDots(page) {
        return (page === 2 && this.currentPage - page > this.range)
            || (page === Math.ceil(this.total / this.pageSize) - 1 && page - this.currentPage > this.range);
    }

    public displayPage(page: number) {
        if (page === 1 || page === Math.ceil(this.total / this.pageSize)) {
            return true;
        }
        if (page > this.currentPage) {
            return ((page - this.currentPage) <= this.range);
        }

        if (page < this.currentPage) {
            return ((this.currentPage - page) <= this.range);
        }

        return true;
    }

    public change(pageIndex: number) {
        this.changed.emit(pageIndex);
    }

    public previous() {
        this.changed.emit(this.currentPage - 1);
    }
    public next() {
        this.changed.emit(this.currentPage + 1);
    }

    public ngOnInit() {
        const pagesCount = Math.ceil(this.total / this.pageSize);

        this.pages = new Array(pagesCount);

        for (let i = 0; i < pagesCount; i++) {
            this.pages[i] = i + 1;
        }
    }
}
