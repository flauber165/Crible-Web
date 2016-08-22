import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams, Response } from '@angular/http';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { ResponseMap } from './response.map';
import { KeyValuePair } from '../key.value.pair';

@Injectable()
export class RestService {
    private serverUrl: string = 'http://localhost:9000';
  
    private _token: string;

    constructor(private http: Http, private translate: TranslateService) {
        this._token = null;
    }

    public set token(value: string) {
        this._token = value;
    }

    public get token(): string {
        return this._token;
    } 

    private resolve(path: string): string {
        return this.serverUrl + '/' + path;
    } 

    private createRequestOptions(isWithoutAuthorization?: boolean): RequestOptions {
        let headers = new Headers({ 'Content-Type': 'application/json' });

        if (!isWithoutAuthorization && this._token) {
            headers.append('Authorization', 'Basic ' + this._token);  
        }

        return new RequestOptions({ headers: headers }); 
    }

    private createRequestOptionsWithUrlParams(urlParams: any, isWithoutAuthorization?: boolean): RequestOptions {
        let requestOptions = this.createRequestOptions(isWithoutAuthorization);
        
        let hasParams = false; 

        let urlSearchParams = new URLSearchParams();

        for (let key in urlParams) {
            urlSearchParams.append(key, urlParams[key]);
            hasParams = true;
        }

        if (hasParams) {
            requestOptions.search = urlSearchParams;
        }

        return requestOptions; 
    }

    public get<T>(url: string, data?: any, isWithoutAuthorization?: boolean): ResponseMap<T> {
        return new ResponseMap<T>(this.translate, this.http.get(this.resolve(url), this.createRequestOptionsWithUrlParams(data, isWithoutAuthorization)));
    }

    public delete<T>(url: string, data?: any, isWithoutAuthorization?: boolean): ResponseMap<T> {
        return new ResponseMap<T>(this.translate, this.http.delete(this.resolve(url), this.createRequestOptionsWithUrlParams(data, isWithoutAuthorization)));
    }

    public post<T>(url: string, data: any, isWithoutAuthorization?: boolean): ResponseMap<T> {
        return new ResponseMap<T>(this.translate, this.http.post(this.resolve(url), JSON.stringify(data), this.createRequestOptions(isWithoutAuthorization)));
    }

    public put<T>(url: string, data: any, isWithoutAuthorization?: boolean): ResponseMap<T> {
        return new ResponseMap<T>(this.translate, this.http.put(this.resolve(url), JSON.stringify(data), this.createRequestOptions(isWithoutAuthorization)));
    }    
}