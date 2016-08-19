import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_PROVIDERS } from '@angular/http';
import { TranslateService, TRANSLATE_PROVIDERS } from 'ng2-translate/ng2-translate';
import { AppComponent }  from './components/app.component';
import { routing } from './routing';

@NgModule({
  imports:      [ BrowserModule, routing ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ],
  providers: [ HTTP_PROVIDERS, TRANSLATE_PROVIDERS ] 
})
export class AppModule {
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en');
    this.translate.use(navigator.language.split('-')[0]);
  } 
 }