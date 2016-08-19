import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { view } from '../view';

@Component({
  selector: 'control-errors',
  templateUrl: view('components/control.errors.html'),
})
export class ControlErrorsComponent {
    @Input() public control: AbstractControl;
    public errors: string[];

    constructor(private translate: TranslateService) {
      
    }

    public ngOnInit(): void {
      this.errors = [];
      this.update();
      this.control.valueChanges.subscribe(() => {
        this.update();
      });
    }

    private update(): void {
      this.errors.length = 0;
      for (var error in this.control.errors) {
        if (this.control.errors.hasOwnProperty(error)) {
          this.errors.push(this.translate.instant(error, this.control.errors[error]));
        }
      }
    }           
}