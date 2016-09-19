import { Component, Input, Output, EventEmitter } from '@angular/core';
import { view } from '../view';

@Component({
  selector: 'breadcrumb',
  templateUrl: view('components/breadcrumb.html'),
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