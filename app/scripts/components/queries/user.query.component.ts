import { Component } from '@angular/core';
import { Router }    from '@angular/router'
import { Validators, FormGroupDirective } from '@angular/forms';
import { TranslatePipe } from 'ng2-translate/ng2-translate';
import { InfiniteScroll } from 'angular2-infinite-scroll';
import { view } from '../../view';
import { SourceService } from '../../services/source.service';
import { QuerySource } from '../../services/query.source';
import { DeleteSource } from '../../services/delete.source';
import { ControlErrorsComponent } from '../control.errors.component';
import { NotifierMessagesComponent } from '../notifier.messages.component';
import { Notifier } from '../../notifier';

@Component({
  templateUrl: view('components/queries/user.query.html'),
  pipes: [TranslatePipe],
  directives: [InfiniteScroll, FormGroupDirective, ControlErrorsComponent, NotifierMessagesComponent],
  providers: [SourceService]
})
export class UserQueryComponent {
  public notifier: Notifier;
  public source: QuerySource;
  public deleteSource: DeleteSource;

  constructor(private router: Router, private sourceService: SourceService) {
    this.notifier = new Notifier();
    this.source = sourceService.createQuery('userQuery', { 
      name: null,
      email: null     
    }, this.notifier, 30);
    this.deleteSource = sourceService.createDelete('userConfection', this.notifier);
    this.source.filter();
  }

  public edit(item: any): void {
    this.router.navigate(['/user-confection'], { queryParams: { id: item.id } });
  }

  public delete(item: any): void {
    this.deleteSource.delete({ id: item.id });
  }       
}