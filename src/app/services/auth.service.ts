import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { AppService } from '../models/service.model';

//Solo para login auth
const url = window.location.origin.includes('localhost')? 
'http://localhost:2903' : 
'http://10.52.2.34:2903' ;

@Injectable({
  providedIn: 'root'
})
export class AuthService extends AppService{
  private http : HttpClient;
  private user : User;

  constructor(private handler : HttpBackend,
              private router  : Router,
              private http2   : HttpClient){
    super();
    this.http = new HttpClient(this.handler);
  }

  private handleResponse(resp) : boolean{
    console.log(resp);

    if(resp['ok']){
      const {
        username, 
        position,
        name,
        email,
      } = resp['user'];

      this.user = new User(
        username, email, position, name
      );

      localStorage.setItem('token', resp['token']);

      return true;
    }

    this.errorMessage = resp['error'] || 'Cannot authenticate';
    return false;
  }

  public loginWithSSO(){
    //Not using api
    return this.http.get(url + '/auth', {
      withCredentials: true
    }).pipe(
      map(resp=> {
        return this.handleResponse(resp);
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
        return this.handleResponse(resp);
      }), catchError(error=>{
        super.errorMessage = "Couldn't authenticate account";
        return of(false);
      })
    );
  }

  public getLoggedUser() : User{
    return this.user;
  }

  public isTokenValid() : boolean{
    const token = localStorage.getItem('token');
    return typeof token != 'undefined' && token != null && token != '' && token != 'undefined';
  }

  public logout(){
    localStorage.removeItem('token');
    this.user = Object.create(null);
  }

  public refresh(state : RouterStateSnapshot){
    if(!this.isTokenValid()){
      this.router.navigate(['auth', 'login']);
    }

    return this.http2.put('/api/auth', {})
    .pipe(
      map(resp=>{
        
       if(this.handleResponse(resp)){
         return true;
       }else{
         this.router.navigate(['auth','login'],{ queryParams: { returnUrl: state.url }});
         return false;
       }

      }),
      catchError(error=>{
       this.router.navigate(['auth','login'],{ queryParams: { returnUrl: state.url }});
       return of(false);
      })
    );
  }

}
