import { Response } from '@angular/http';
import { FormGroup, FormControl } from '@angular/forms';
import { Notifier } from '../notifier';
import { RestService } from './rest.service';

export class ConfectionSource {
    public isPending: boolean;
    public isEdit: boolean;   

    constructor(private restService: RestService, private url: string, public formGroup: FormGroup, private notifier?: Notifier) {
        this.isPending = false;
        this.isEdit = false;
    }

    public load(item: any): void {    
        if (Object.keys(item).length > 0) {
            this.isEdit = true;
            this.isPending = true;
            this.restService.get<any>(this.url, item).notifier(this.notifier, true).subscribe((data: any): void => {
                for (var key in data) {
                    if (this.formGroup.controls.hasOwnProperty(key)) {
                        var formControl = <FormControl> this.formGroup.controls[key];
                        if (data.hasOwnProperty(key)) {
                            formControl.updateValue(data[key]);
                        }                            
                    }                  
                }
                this.isPending = false;
            }, (error: any): void => {
                this.isPending = false;
            });              
        }     
    }

    public reset(): void {
        for (var key in this.formGroup.controls) {
            if (this.formGroup.controls.hasOwnProperty(key)) {
                (<FormControl> this.formGroup.controls[key]).updateValue(null);
            }
        }
    }

    public save(): void {
        var successResponse = (data: any): void => {
            if (!this.isEdit) {
                this.reset();                
            }
            this.isPending = false;
        };

        var rejectedResponse = (error: any): void => {
            this.isPending = false;
        };

        this.isPending = true;

        if (this.isEdit) {
            this.restService.put<any>(this.url, this.formGroup.value).notifier(this.notifier).subscribe(successResponse, rejectedResponse);      
        }
        else {
            this.restService.post<any>(this.url, this.formGroup.value).notifier(this.notifier).subscribe(successResponse, rejectedResponse); 
        }   
    }
}