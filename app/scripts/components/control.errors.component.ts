import { Component, Input, Host, SkipSelf } from '@angular/core';
import { AbstractControl, FormGroupDirective } from '@angular/forms';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { view } from '../view';

@Component({
  selector: 'control-errors',
  templateUrl: view('components/control.errors.html'),
})
export class ControlErrorsComponent  {
    @Input('control') public control: string;
    public errors: string[];

    constructor(@Host() @SkipSelf() private parent: FormGroupDirective, private translate: TranslateService) {

    }

    public get formControl(): AbstractControl {
      return this.parent.form.controls[this.control];
    }

    public ngOnInit(): void {
      this.errors = [];
      this.update();
      this.formControl.valueChanges.subscribe(() => {
        this.update();
      });
    }

    private update(): void {
      this.errors.length = 0;
      for (var error in this.formControl.errors) {
        if (this.formControl.errors.hasOwnProperty(error)) {
          this.translate.get(error, this.formControl.errors[error]).subscribe((text: string) => {
              this.errors.push(text);
          });      
        }
      }
    }           
}