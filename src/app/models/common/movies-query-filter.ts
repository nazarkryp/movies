import { QueryFilter } from './query-filter';

export class MoviesQueryFilter extends QueryFilter {
    public studios: number[];
    public models: string[];
    public search: string;
    public categories: string[];
}
