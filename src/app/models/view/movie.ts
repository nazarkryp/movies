import { Attachment } from './attachment';
import { Studio } from './studio';
import { Subscription } from 'rxjs';

export class Movie {
    public movieId: number;
    public title: string;
    public uri: string;
    public description: string;
    public date: Date;
    public attachments: Attachment[];
    public studio: Studio;
    public selectedAttachment = 0;
    public subscription: Subscription;
    public duration: string;
}
