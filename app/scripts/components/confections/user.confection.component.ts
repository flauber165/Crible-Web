import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Validators } from '@angular/forms';
import { view } from '../../view';
import { SourceService } from '../../services/source.service';
import { ConfectionSource } from '../../services/confection.source';
import { Notifier } from '../../notifier';

@Component({
  templateUrl: view('components/confections/user.confection.html'),
  providers: [SourceService]
})
export class UserConfectionComponent {
  public notifier: Notifier;
  public source: ConfectionSource;

  constructor(private route: ActivatedRoute, private sourceService: SourceService) {
    this.notifier = new Notifier();
    this.source = sourceService.createConfection('userConfection', {
      name: [null, Validators.compose([Validators.required, Validators.maxLength(3)])],
      email: [null, Validators.compose([Validators.required, Validators.maxLength(40)])]    
    }, this.notifier);
  }

  public ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
        this.source.load(params);
    });    
  }

  public cancel(): void {    
      window.history.back(); 
  }     
}