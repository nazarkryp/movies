import { QueryFilter } from './query-filter';

export class MoviesQueryFilter extends QueryFilter {
    public studios: number[];
    public search: string;
    public categories: string[];
}
