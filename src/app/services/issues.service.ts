import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppService } from '../models/service.model';

@Injectable({
  providedIn: 'root'
})
export class IssuesService extends AppService{

  private issues = [];
  private filters : any[] = [];
  
  constructor(private http    : HttpClient,
              private router  : Router) { super(); }


  public loadDevices(body = null, route = 'all'){
    let query = this.applyFilters(body);

    return this.http.get(`/api/issues/${route}${ query }`)
                .pipe(
                  map((resp:any)=>{
                    console.log(this.router.url);
                    console.log(resp);
                    if(resp.ok){
                      this.issues = resp['issues'];
                      return true;
                    }
                    this.errorMessage = 'No matches found';
                    return false;
                  }),
                  catchError(error=>{
                    console.log(error);
                    this.errorMessage = 'Server error';
                    return of(false);
                  })
                );
  }

  private applyFilters(obj) : string{
    if(obj === null){
      return '';
    }
    this.filters[this.router.url] = obj;

    let filters = [];

    Object.keys(obj).forEach(k=>{
      let query = k + '=' + obj[k];
      filters.push(query);
    });

    if(filters.length != 0){
      return '?'+filters.join('&');
    }
    return '';
  }

  public getIssues(){
    return this.issues;
  }
  
  public getSavedFilters(){
    return /*this.filters[this.router.url] ||*/ Object.create(null);
  }

  public resetFilters(){
    this.filters[this.router.url] = null;
  }
}
