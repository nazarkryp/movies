import { Attachment } from './attachment';
import { Studio } from './studio';
import { Category } from './category';
import { Model } from './model';

export class Movie {
    public movieId: number;
    public title: string;
    public uri: string;
    public description: string;
    public date: Date;
    public attachments: Attachment[];
    public studio: Studio;
    public selectedAttachment = 0;
    public duration: string;
    public categories: Category[];
    public models: Model[];
}
