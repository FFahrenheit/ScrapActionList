import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {

  private retryCount: number;

  constructor(private router: Router) {
    this.retryCount = 0;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // if (maintenance) {
    //   this.router.navigate(['503']);
    // }

    const token = localStorage.getItem('token') || "";
    let tokenizedRequest = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + token
      }
    });

    return next.handle(tokenizedRequest).pipe(
      catchError((error: any) => {
        if (error) {
          this.retryCount += 1;
          console.log('Error: ' + this.retryCount + ' retries');
          if (this.retryCount >= 4) {
            this.router.navigate(['500'])
          }
        }
        console.warn(error);
        return throwError('Error');
      }));
  }
}
