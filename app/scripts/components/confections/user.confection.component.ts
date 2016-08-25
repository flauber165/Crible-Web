import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormGroupDirective } from '@angular/forms';
import { TranslatePipe } from 'ng2-translate/ng2-translate';
import { view } from '../../view';
import { SourceService } from '../../services/source.service';
import { ConfectionSource } from '../../services/confection.source';
import { ControlErrorsComponent } from '../control.errors.component';
import { NotifierMessagesComponent } from '../notifier.messages.component';
import { Notifier } from '../../notifier';

@Component({
  templateUrl: view('components/confections/user.confection.html'),
  pipes: [TranslatePipe],
  directives: [FormGroupDirective, ControlErrorsComponent, NotifierMessagesComponent],
  providers: [SourceService]
})
export class UserConfectionComponent {
  public notifier: Notifier;
  public source: ConfectionSource;

  constructor(private router: Router, private sourceService: SourceService) {
    this.notifier = new Notifier();
    this.source = sourceService.createConfection('userConfection', {
      name: [null, Validators.compose([Validators.required, Validators.maxLength(3)])],
      email: [null, Validators.compose([Validators.required, Validators.maxLength(40)])]    
    }, this.notifier);
  }

  public ngOnInit(): void {
    this.router.routerState.queryParams.subscribe(params => {
        this.source.load(params);
    });    
  }

  public cancel(): void {    
      window.history.back(); 
  }     
}