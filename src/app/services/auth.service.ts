import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppService } from './service.template';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends AppService{
  private http : HttpClient;

  constructor(private handler : HttpBackend){
    super();
    this.http = new HttpClient(this.handler);
    console.log(this.http);
  }

  public loginWithSSO(){
    return this.http.get('http://127.0.0.1:2903/auth', {
      withCredentials: true
    }).pipe(
      map(resp=> {
        console.log(resp);
        return true;
      }, catchError(error=> {
        super.errorMessage = "Couldn't authenticate account";
        return of(false);
      }))
    )
  }
}
