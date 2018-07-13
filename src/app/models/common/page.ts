export class Page<T> {
    public data: T[];
    public total: number;
    public offset: number;
    public size: number;
    public pagesCount: number;
}
