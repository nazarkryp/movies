import { IMapper } from './mapper';
import { Page } from 'app/models/common';

export class PageMapper<TSource, TResult> {
    constructor(
        private mapper: IMapper<TSource, TResult>) { }

    public map(responsePage: Page<TSource>): Page<TResult> {
        const page = new Page<TResult>();

        page.offset = responsePage.offset;
        page.size = responsePage.size;
        page.total = responsePage.total;
        page.data = this.mapper.mapFromResponseArray(responsePage.data);
        page.pagesCount = responsePage.pagesCount;

        return page;
    }
}
