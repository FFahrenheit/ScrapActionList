import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppService } from '../models/service.model';

@Injectable({
  providedIn: 'root'
})
export class GetIssueService extends AppService{

  private issue = null;

  constructor(private http: HttpClient) { super(); }

  public loadIssue(id : string){
    this.issue = null;
    return this.http.get(`/api/issue/${ id }`)
               .pipe(
                 map(resp=>{
                   if(resp['ok']){
                     this.issue = resp['issue'];
                     return true;
                   }
                   this.errorMessage = "Couldn't load issue";
                   return false;
                 }),catchError(error=>{
                   console.log(error);
                   this.errorMessage = 'Server error';
                   return of(false);
                 })
               );
  }

  public getIssue(){
    return this.issue;
  }
}
