import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateService, TranslateModule } from 'ng2-translate/ng2-translate';
import { RestService } from './services/rest.service';
import { AppComponent }  from './components/app.component';
import { routing } from './routing';

@NgModule({
  imports:      [ BrowserModule, ReactiveFormsModule, HttpModule, TranslateModule.forRoot(), routing ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ],
  providers: [ RestService ] 
})
export class AppModule {
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en');
    this.translate.use(navigator.language.split('-')[0]);
  } 
 }