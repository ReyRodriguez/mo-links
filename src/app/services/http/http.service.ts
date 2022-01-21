import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  linksUrl = 'https://private-anon-8bf6b557c3-henrybravo.apiary-mock.com/links';
  deleteLinkUrl =
    'https://private-anon-8bf6b557c3-henrybravo.apiary-mock.com/links/';
  getUserUrl =
    'https://private-anon-9ea0964c59-henrybravo.apiary-mock.com/user/1';
  userLoginUrl =
    'https://private-anon-8bf6b557c3-henrybravo.apiary-mock.com/login';
  userSignUpUrl =
    'https://private-anon-8bf6b557c3-henrybravo.apiary-mock.com/register';

  constructor(private http: HttpClient) {}
  /**
   * Gets links list form the api, due to server responding with invalid json we foce
   * the responseType to be text an then treat the response as needed.
   * @returns Observable with the response
   */
  getLinks() {
    return this.http
      .get(this.linksUrl, { responseType: 'text' })
      .pipe(catchError(this.handleError));
  }

  /**
   * Gets user data
   * @returns Observable with the response
   */
  getUser() {
    return this.http
      .get(`${this.getUserUrl}`)
      .pipe(catchError(this.handleError));
  }

  /**
   * make te api call to login user
   * @param user data of the user
   * @returns Observable with the response
   */
  logInUser(user: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http
      .post<any>(this.userLoginUrl, user, httpOptions)
      .pipe(catchError(this.handleError));
  }

  /**
   * make te api call to sign up user
   * @param user data of the user
   * @returns Observable with the response
   */
  signUpUser(user: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http
      .post<any>(this.userSignUpUrl, user, httpOptions)
      .pipe(catchError(this.handleError));
  }

  /**
   * make te api call to create a link
   * @param link the link data
   * @returns Observable with the response
   */
  createLink(link: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http
      .post<any>(this.linksUrl, link, httpOptions)
      .pipe(catchError(this.handleError));
  }

  /**
   * make te api call to delete a link
   * @param id
   * @returns response
   */
  deleteLink(id: any): Observable<any> {
    const url = `${this.deleteLinkUrl}/${id}`;
    return this.http.delete<any>(url).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    if (error.error instanceof ErrorEvent) {
      console.error(
        'There was an error on the client side:',
        error.error.message
      );
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Error, try later :(.');
  }
}
