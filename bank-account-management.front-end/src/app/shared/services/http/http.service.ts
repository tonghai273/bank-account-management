import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { SortModel } from '../../models/sort-model';
import { SESSION } from '../../utils/utils';
import { HandleService } from '../handle/handle.service';
import { ErrorLogService } from '../log/error-log.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(
    private http: HttpClient,
    private logError: ErrorLogService,
    private handleError: HandleService,
  ) {
  }

  getApiAsync<T>(url: string, params: any, sortModel: SortModel): Observable<T[]> {

    // Add params to url
    if (params !== null) {
      url += '?' + this.jsonToParams(params);
    }

    // add sort
    if (sortModel.column !== '' && sortModel.sort !== '') {
      url += `&sort=${sortModel.column}&order=${sortModel.sort}`
    }
    debugger
    return this.http.get<T[]>(url)
      .pipe(
        tap(_ => this.logError.log('get data success')),
        catchError(this.handleError.handleError<T[]>(url, []))
      );
  }


  postApiAsync<T>(url: string, body: T): Observable<T> {
    return this.http.post<T>(url, body, { headers: this.getHeaders() })
      .pipe(
        tap(_ => this.logError.log(`post data \w ${body}`)),
        catchError(this.handleError.handleError<T>('post data'))
      )
  }

  putApiAsync<T>(url: string, body: T): Observable<T> {
    return this, this.http.put<T>(url, body, { headers: this.getHeaders() })
      .pipe(
        tap(_ => this.logError.log(`updated data \w ${body}`)),
        catchError(this.handleError.handleError<T>('update data'))
      )
  }

  deleteApiAsync<T>(url: string, params: string): Observable<T> {
    // Add params to url
    if (params !== null) {
      url += '/' + params;
    }
    return this.http.delete<T>(url, { headers: this.getHeaders() })
      .pipe(
        tap(_ => this.logError.log(`delete data \w ${params}`)),
        catchError(this.handleError.handleError<T>('delete data'))
      )
  }

  findByID<T>(url: string, params: string): Observable<T> {
    // Add params to url
    if (params !== null) {
      url += '/' + params;
    }
    return this.http.get<T>(url, { headers: this.getHeaders() })
      .pipe(
        tap(_ => this.logError.log('find one data')),
        catchError(this.handleError.handleError<T>('find data'))
      );
  }

  // add headers
  private getHeaders(): HttpHeaders {
    let headers: HttpHeaders
    // add headers
    if (SESSION.getSessionAuthen()) {
      headers = new HttpHeaders({ 'Content-Type': 'application/json', 'x-auth': SESSION.getSessionAuthen() })
    } else {
      headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    return headers
  }

  // add params to url
  public jsonToParams(obj: any) {
    const str = Object.keys(obj).map(function (key) {
      let value = obj[key];
      if (value == null) { value = ''; }
      return key + '=' + encodeURI(value);
    }).join('&');
    return str;
  }

  //
}
