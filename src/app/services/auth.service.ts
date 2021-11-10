import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppService } from './service.template';

//Solo para login auth
const url = window.location.origin.includes('localhost')? 
'http://localhost:2903' : 
'http://10.52.2.34:2903' ;

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
    //Not using api
    return this.http.get(url + '/auth', {
      withCredentials: true
    }).pipe(
      map(resp=> {
        console.log(resp);
        if(resp['ok']){
          return true;
        }

        return false;
      }, catchError(error=> {
        super.errorMessage = "Couldn't authenticate account";
        return of(false);
      }))
    );
  }

  public loginWithCredentials(login : string, password : string){
    return this.http.post( url + '/auth', {
      login,
      password
    }).pipe(
      map(resp=>{
        console.log(resp);
        if(resp['ok']){
          return true;
        }

        return false;
      }), catchError(error=>{
        super.errorMessage = "Couldn't authenticate account";
        return of(false);
      })
    );
  }

}
