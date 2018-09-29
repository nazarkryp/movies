import { QueryFilter } from './query-filter';

export class MoviesQueryFilter extends QueryFilter {
    public studioId: number[];
    public search: string;
    public categories: string[];
}
