import { Notifier } from '../notifier';
import { RestService } from './rest.service';

export class DeleteSource {
    public isPending: boolean;

    constructor(private restService: RestService, private url: string, private notifier?: Notifier) {
        this.isPending = false;
    }

    public delete(item: any): void {
        var response = (data: any): void => {
            this.isPending = false;
        };

        this.isPending = true;

        this.restService.delete<any>(this.url, item).notifier(this.notifier).subscribe(response, response);
    }    
}