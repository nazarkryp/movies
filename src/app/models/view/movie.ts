import { Attachment } from './attachment';
import { Studio } from './studio';

export class Movie {
    public id: number;
    public title: string;
    public link: string;
    public date: Date;
    public attachments: Attachment[];
    public studio: Studio;
}
