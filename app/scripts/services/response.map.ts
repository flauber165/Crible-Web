import { Response } from '@angular/http';
import { Observable, } from 'rxjs';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { Notifier, NotifierState } from '../notifier';

export class ResponseMap<T> {
    constructor(private translate: TranslateService, private observable: Observable<Response>) {

    }

    public notifier(notifier: Notifier, isHideTitleSuccess?: boolean): Observable<T> {
        if(notifier) {
            return this.observable.map((response: Response): T => {
                notifier.clear();
                notifier.state = NotifierState.Success;
                if (!isHideTitleSuccess) {
                    notifier.title = this.translate.instant('operationSuccess');                
                }
                return response.text() != '' ? response.json() : null;
            }).catch((response: Response): Observable<any> => {
                var data = response.json();
                notifier.clear();
                notifier.state = NotifierState.Error;       
                notifier.title = data.message;
                if (data.hasOwnProperty('errors')) {
                    for (var error in data.errors) {
                        notifier.pushMessage(data.errors[error]);
                    }                   
                }  
                return Observable.throw<any>(data);
            });
        }
        else {
            return this.simple();
        }
    }

    public simple(): Observable<T> {
        return this.observable.map((response: Response): T => {
            return response.json();
        });
    }          
}