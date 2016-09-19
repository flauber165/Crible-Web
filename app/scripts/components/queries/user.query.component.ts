import { Component } from '@angular/core';
import { Router }    from '@angular/router'
import { Validators } from '@angular/forms';
import { view } from '../../view';
import { SourceService } from '../../services/source.service';
import { QuerySource } from '../../services/query.source';
import { DeleteSource } from '../../services/delete.source';
import { Notifier } from '../../notifier';

@Component({
  templateUrl: view('components/queries/user.query.html'),
  providers: [SourceService]
})
export class UserQueryComponent {
  public notifier: Notifier;
  public source: QuerySource;
  public deleteSource: DeleteSource;

  constructor(private router: Router, private sourceService: SourceService) {
    this.notifier = new Notifier();
    this.source = sourceService.createQuery('user/query', { 
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