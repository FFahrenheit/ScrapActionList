import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppService } from '../models/service.model';

@Injectable({
  providedIn: 'root'
})
export class CreateService extends AppService{

  private id : string;
  
  constructor(private http : HttpClient) { 
    super();
  }

  public d0(body){
    return this.http.post('/api/d0', body)
               .pipe(
                 map(resp=>{
                   if(resp['ok']){
                     this.id = resp['id'];
                     return true;
                   }
                   this.errorMessage = "Couldn't upload the issue to the database";
                   return false;
                 }),catchError(error=>{
                   this.errorMessage = 'Server error';
                   return of(false);
                 })
               );
  }

  public d1(body, id){
    return this.http.post(`/api/d1/${ id }`, body)
    .pipe(
      map(resp=>{
        if(resp['ok']){
          return true;
        }
        this.errorMessage = "Couldn't update to D1";
        return false;
      }),catchError(error=>{
        this.errorMessage = 'Server error';
        return of(false);
      })
    );
  }

  public d2(body, id){
    return this.http.post(`/api/d2/${ id }`, body)
    .pipe(
      map(resp=>{
        if(resp['ok']){
          return true;
        }
        this.errorMessage = "Couldn't update to D2";
        return false;
      }),catchError(error=>{
        this.errorMessage = 'Server error';
        return of(false);
      })
    );
  }

  public getId() : string{
    return this.id;
  }
}
