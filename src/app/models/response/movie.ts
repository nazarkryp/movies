import { AttachmentResponse } from './attachment';
import { StudioResponse } from './studio';

export class MovieResponse {
    public id: number;
    public title: string;
    public link: string;
    public date: Date;
    public attachments: AttachmentResponse[];
    public studio: StudioResponse;
}
