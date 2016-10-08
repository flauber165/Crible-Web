import { Route, Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './components/default.component';
import { UserQueryComponent } from './components/queries/user.query.component';
import { UserConfectionComponent } from './components/confections/user.confection.component';
import { PasswordChangeComponent } from './components/password-change/password-change.component';

import { Menu } from './menu'

const routes : Routes = [];

export const menus: Menu[] = [
  { title: 'home', checkPermission: true, action: { path: '', component: DefaultComponent }},
  { title: 'passwordChange', checkPermission: true, action: { path: 'password-change', component: PasswordChangeComponent }},
  { title:'entries', checkPermission: true, action: [
      { title: 'userQuery', action: { path: 'user-query', component: UserQueryComponent }, checkPermission: true},
      { title: 'userConfection', action: { path: 'user-confection', component: UserConfectionComponent }, checkPermission: true}
    ]
  }
];

GetRoutes(menus);

function GetRoutes(menus: Menu[]): void {
    for (var index = 0; index < menus.length; index++) 
    {
      var element = menus[index];
      if (element.action['path'] === undefined) {
        GetRoutes(<Menu[]>element.action);
      }
      else {
        routes.push(<Route>element.action);
      }
    }  
}

export const routing = RouterModule.forRoot(routes);