import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnInit } from '@angular/core';

@Component({
    selector: 'movies-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent implements OnInit {
    private _pageSize: number;
    private _total: number;
    private range = 4;
    private maxPagesCount = 20;

    public pages: number[];
    @Output() public changed = new EventEmitter<number>();

    @Input() public currentPage: number;

    public get pageSize(): number {
        return this._pageSize;
    }

    @Input()
    public set pageSize(value: number) {
        this._pageSize = value;
    }

    public get total(): number {
        return this._total;
    }

    @Input()
    public set total(value: number) {
        this._total = value;
    }


    public get pagesCount(): number {
        const pages = Math.ceil(this.total / this.pageSize);

        return pages;
    }

    public showDots(page) {
        const result = (page === 2 && this.currentPage - page > this.range) || (page === this.pagesCount - 1 && page - this.currentPage > this.range);

        return result;
    }

    // tslint:disable-next-line:member-ordering
    private counter = 0;
    public displayPage(page: number) {
        // if (this.counter >= this.maxPagesCount) {
        //     return false;
        // }
        if (page === 1 || page === this.pagesCount) {
            return true;
        }

        if (this.currentPage < page) {
            return (page - this.currentPage) <= this.range;
        }

        if (this.currentPage > page) {
            return (this.currentPage - page) <= this.range;
        }

        this.counter++;

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

    public ngOnInit(): void {
        this.initializePages();
    }

    private initializePages() {
        const pagesCount = Math.ceil(this.total / this.pageSize);

        this.pages = new Array<number>(pagesCount);

        for (let i = 0; i < pagesCount; i++) {
            this.pages[i] = i + 1;
        }
    }
}
