import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppService } from '../models/service.model';

@Injectable({
  providedIn: 'root'
})
export class AdministrationService extends AppService{

  constructor(private http : HttpClient) { super(); }

  public updateManagers(departments){
    return this.http.put('/api/department', { departments })
               .pipe(
                 map(resp=>{
                   if(resp['ok']){
                     return true;
                   }
                   this.errorMessage = resp['error'] || "Couldn't update managers";
                   return false;
                 }),
                 catchError(error=>{
                   this.errorMessage = 'Server error';
                   return of(false);                   
                 })
               );
  }
}
