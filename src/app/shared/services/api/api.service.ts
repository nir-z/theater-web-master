import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }


  public get<T>(url: string, headers?: { [name: string]: string }, params: HttpParams = new HttpParams()): Observable<T> {
    return this.http.get<T>(url, { headers: this.setHeaders(headers), params });
  }

  post<T>(url: string, body: Object = {}, customeHeaderConfig?: any): Observable<any> {
    return this.http
      .post<T>(url, body, {
        headers: this.setHeaders(null, customeHeaderConfig)
      })
  }

  private setHeaders(headers?: { [name: string]: string }, customeHeaderConfig?: { [name: string]: string }): HttpHeaders {
    const headersConfig = customeHeaderConfig || {
      'Content-Type': 'application/json'
    };

    Object.assign(headersConfig, headers);

    return new HttpHeaders(headersConfig);
  }



}
