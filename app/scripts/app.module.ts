import { NgModule }      from '@angular/core';
import { NgClass } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule, FormGroupDirective } from '@angular/forms';
import { TranslateService, TranslateModule, TranslatePipe } from 'ng2-translate/ng2-translate';
import { InfiniteScroll } from 'angular2-infinite-scroll';
import { RestService } from './services/rest.service';
import { routing } from './routing';
import { AppComponent }  from './components/app.component';
import { DefaultComponent }  from './components/default.component';
import { MenuComponent } from './components/menu.component';
import { BreadcrumbComponent } from './components/breadcrumb.component';
import { ControlErrorsComponent } from './components/control.errors.component';
import { NotifierMessagesComponent } from './components/notifier.messages.component';
import { UserConfectionComponent } from './components/confections/user.confection.component';
import { UserQueryComponent } from './components/queries/user.query.component';
import { PasswordChangeComponent } from './components/password-change/password-change.component';

@NgModule({
  imports:      [ BrowserModule, ReactiveFormsModule, HttpModule, TranslateModule.forRoot(), routing ],
  declarations: [ AppComponent, DefaultComponent, UserConfectionComponent, UserQueryComponent, ControlErrorsComponent, NotifierMessagesComponent, BreadcrumbComponent, MenuComponent, InfiniteScroll, PasswordChangeComponent ],
  bootstrap:    [ AppComponent ],
  providers: [ RestService ] 
})
export class AppModule {
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en');
    this.translate.use(navigator.language.split('-')[0]);
  } 
 }