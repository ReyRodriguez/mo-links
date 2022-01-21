import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  linksUrl = 'https://private-anon-8bf6b557c3-henrybravo.apiary-mock.com/links';
  deleteLinkUrl = 'https://private-anon-8bf6b557c3-henrybravo.apiary-mock.com/links/';
  getUserUrl = 'https://private-anon-9ea0964c59-henrybravo.apiary-mock.com/user/1';
  userLoginUrl = 'https://private-anon-8bf6b557c3-henrybravo.apiary-mock.com/login';
  userSignUpUrl = 'https://private-anon-8bf6b557c3-henrybravo.apiary-mock.com/register';
  
  constructor(private http: HttpClient) { }

  getLinks() {
    return this.http.get(this.linksUrl,{responseType: 'text'}).pipe(
      catchError(this.handleError)
    );
  }

  getUser() {
    return this.http.get(`${this.getUserUrl}`).pipe(
      catchError(this.handleError)
    );
  }

  logInUser(user: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post<any>(this.userLoginUrl, user, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  signUpUser(user: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post<any>(this.userSignUpUrl, user, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  createLink(link: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post<any>(this.linksUrl, link, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteLink(id: any): Observable<any> {
    const url = `${this.deleteLinkUrl}/${id}`;
    return this.http.delete<any>(url)
      .pipe(
        catchError(this.handleError)
      );
  }


  

  

  private handleError(error: HttpErrorResponse): Observable<any> {
    if (error.error instanceof ErrorEvent) {
      console.error('Ocurrio un error del lado del cliente:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Ocurrio un error, intenta mas tarde.');
  }
}

