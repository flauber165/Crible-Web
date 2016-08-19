import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { Notifier } from '../notifier';
import { view } from '../view';

@Component({
  selector: 'notifier-messages',
  templateUrl: view('components/notifier.messages.html'),
  directives: [NgClass]
})
export class NotifierMessagesComponent {
    @Input() public notifier: Notifier;        
}