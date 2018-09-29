import { Movie, Studio, StudioPage } from 'app/models/view';
import { MovieResponse, StudioResponse } from '../models/response';
import { PageMapper } from './page.mapper';
import { IMapper } from './mapper';
import { StudioPageResponse } from 'app/models/response';

export class StudioPageMapper extends PageMapper<MovieResponse, Movie> {
    constructor(
        protected mapper: IMapper<MovieResponse, Movie>,
        protected studioMapper: IMapper<StudioResponse, Studio>) {
        super(mapper);
    }

    public map(response: StudioPageResponse): StudioPage {
        try {
            const page = new StudioPage();

            page.studio = this.studioMapper.mapFromResponse(response.studio);
            page.page = response.page;
            page.size = response.size;
            page.total = response.total;
            page.data = this.mapper.mapFromResponseArray(response.data);

            return page;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}
