import { IMapper } from './mapper';
import { Page } from 'app/models/common';
import { PageResponse } from 'app/models/response/page';

export class PageMapper<TSource, TResult> {
    constructor(
        protected movieMapper: IMapper<TSource, TResult>) { }

    public map(responsePage: PageResponse<TSource>): Page<TResult> {
        try {
            const page = new Page<TResult>();

            page.page = responsePage.page;
            page.size = responsePage.size;
            page.total = responsePage.total;
            page.data = this.movieMapper.mapFromResponseArray(responsePage.data);

            return page;
        } catch (err) {
            throw err;
        }
    }
}
