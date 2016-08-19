import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES }  from '@angular/router';
import { MenuComponent } from './menu.component';
import { view } from '../view';

@Component({
  selector: 'app',
  templateUrl: view('components/app.html'),
    directives: [ ROUTER_DIRECTIVES, MenuComponent ],
})
export class AppComponent {
}