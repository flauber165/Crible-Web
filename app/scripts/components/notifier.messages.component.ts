import { Component, Input } from '@angular/core';
import { Notifier } from '../notifier';
import { view } from '../view';

@Component({
  selector: 'notifier-messages',
  templateUrl: view('components/notifier.messages.html'),
})
export class NotifierMessagesComponent {
    @Input() public notifier: Notifier;        
}