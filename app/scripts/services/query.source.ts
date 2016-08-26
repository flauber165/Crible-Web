import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Notifier } from '../notifier';
import { RestService } from './rest.service';

export class QuerySource {
    private index: string;
    private runningObservable: Observable<any>; 
    public data: any[];

    constructor(private restService: RestService, private url: string, public formGroup: FormGroup, private notifier?: Notifier, private start?: number, private amount?: number) {
        this.index = null;
        this.runningObservable = null;
        this.data = [];
        this.start = start || 10;
        this.amount = amount || 3;
    }

    public filter(): void {
        this.index = null;
        this.runningObservable = null;
        this.data.length = 0;
        this.load(this.start);
    }

    public reset(): void {
        for (var key in this.formGroup.controls) {
            if (this.formGroup.controls.hasOwnProperty(key)) {
                (<FormControl> this.formGroup.controls[key]).updateValue(null);
            }
        }
        this.filter();
    }

    public load(amount?: number): void {
        var observable = this.restService.post<any>(this.url, Object.assign({ index: this.index, count: amount || this.amount }, this.formGroup.value))
            .notifier(this.notifier, true);

        if (this.runningObservable) {
            this.runningObservable.concat(observable);
        }
        else {
            this.runningObservable = observable;

            this.runningObservable.subscribe((value: any): void => {
                this.index = value.index;
                value.data.forEach((item: any): void => {
                    this.data.push(item);             
                });                
            }, null, () => this.runningObservable = null); 
        }    
    }     
}