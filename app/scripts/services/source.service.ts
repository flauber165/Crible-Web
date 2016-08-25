import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { QuerySource } from './query.source';
import { ConfectionSource } from './confection.source';
import { DeleteSource } from './delete.source';
import { Notifier } from '../notifier';
import { RestService } from './rest.service';

@Injectable()
export class SourceService {
    constructor(private restService: RestService, private formBuilder: FormBuilder) {       
    }

    public createQuery(url: string, definition: any, notifier?: Notifier, start?: number, amount?: number): QuerySource {
        return new QuerySource(this.restService, url, this.formBuilder.group(definition), notifier, start, amount);
    }

    public createConfection(url: string, definition: any, notifier?: Notifier): ConfectionSource {
        return new ConfectionSource(this.restService, url, this.formBuilder.group(definition), notifier);
    }

    public createDelete(url: string, notifier?: Notifier): DeleteSource {
        return new DeleteSource(this.restService, url, notifier);
    }    
}