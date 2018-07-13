import { Attachment } from './attachment';
import { Studio } from './studio';
import { Subscription } from 'rxjs';

export class Movie {
    public id: number;
    public title: string;
    public link: string;
    public date: Date;
    public attachments: Attachment[];
    public studio: Studio;
    public selectedAttachment = 0;
    public subscription: Subscription;
}
