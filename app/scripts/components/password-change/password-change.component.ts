import { Component } from '@angular/core';
import { view } from '../../view';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Notifier } from '../../notifier';
import { Router }    from '@angular/router'
import { RestService } from '../../services/rest.service';

@Component({
   templateUrl: view('components/password-change/password-change.html')
})
export class PasswordChangeComponent  {
  public userName: string;
  public passChangeNotifier: Notifier;
  public passChangeForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private restService: RestService) {
    this.userName = null;
    this.passChangeNotifier = new Notifier();
    this.passChangeForm = formBuilder.group({
      password: [null, Validators.required]
    });
  } 

  public enter(): void {
    this.restService.post<any>('passwordChange', this.passChangeForm.value, true)
      .notifier(this.passChangeNotifier, true).subscribe((data) => {
        this.restService.token = data.token;
        this.userName = data.userName;
        this.passChangeForm.reset();
      });
  } 

  public exit(): void {
    this.restService.token = null;    
    this.userName = null;
  }
}