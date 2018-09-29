import { AttachmentResponse } from './attachment.response';
import { StudioResponse } from './studio.response';
import { CategoryResponse } from './category.response';

export class MovieResponse {
    public movieId: number;
    public title: string;
    public description: string;
    public uri: string;
    public date: Date;
    public attachments: AttachmentResponse[];
    public studio: StudioResponse;
    public duration: string;
    public categories: CategoryResponse[];
}
