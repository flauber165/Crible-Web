import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { view } from '../view';
import { Notifier } from '../notifier';

import { RestService } from '../services/rest.service';

@Component({
  selector: 'app',
  templateUrl: view('components/app.html')
})
export class AppComponent {

  public userName: string;
  public loginNotifier: Notifier;
  public loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private restService: RestService) {
    this.userName = null;
    this.loginNotifier = new Notifier();
    this.loginForm = formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
  } 

  public enter(): void {
    this.restService.post<any>('enter', this.loginForm.value, true)
      .notifier(this.loginNotifier, true).subscribe((data) => {
        this.restService.token = data.token;
        this.userName = data.userName;
        this.loginForm.reset();
      });
  } 

  public exit(): void {
    this.restService.token = null;    
    this.userName = null;
  }
}