export class PageResponse<T> {
    public data: T[];
    public page: number;
    public size: number;
    public total: number;
}
