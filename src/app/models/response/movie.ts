import { AttachmentResponse } from './attachment';
import { StudioResponse } from './studio';

export class MovieResponse {
    public movieId: number;
    public title: string;
    public description: string;
    public uri: string;
    public date: Date;
    public attachments: AttachmentResponse[];
    public studio: StudioResponse;
    public duration: string;
}
