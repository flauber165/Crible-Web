import { Component, Input, Output, EventEmitter } from '@angular/core';
import { KeyValuePair} from '../key.value.pair'
import { view } from '../view';
import { TranslateService, TranslatePipe } from 'ng2-translate/ng2-translate';

@Component({
  selector: 'breadcrumb',
  templateUrl: view('components/breadcrumb.html'),
  pipes: [TranslatePipe]
})
export class BreadcrumbComponent{
    @Input() public breadcrumb: any[];
    @Input() public getTitle: (item: any) => string;
    @Output() private notify: EventEmitter<number>;

    constructor() {
        this.notify = new EventEmitter<number>();
    }


    public back(position : number): void{
        if(position == this.breadcrumb.length - 1){
            return;
        }
        else
        {
            for (var index = position; index < this.breadcrumb.length; index++) {
                this.breadcrumb.pop();
            }
            this.notify.emit(position);
        }
    }

    public clear():void{
        this.breadcrumb.length = 0;
        this.notify.emit(undefined);
    }   
}