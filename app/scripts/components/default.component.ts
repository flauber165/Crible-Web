import { Component } from '@angular/core';
import { TranslatePipe } from 'ng2-translate/ng2-translate';
import { view } from '../view';

@Component({
  templateUrl: view('components/default.html'),
  pipes: [TranslatePipe]
})
export class DefaultComponent { }