import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Defective, Part } from '../interfaces/resources.items.interface';
import { AppService } from '../models/service.model';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService extends AppService{
  private parts : Part[];
  private problems : Defective[];

  constructor(private http : HttpClient) { 
    super();
  }

  public loadResources(){
    return forkJoin([
      this.http.get('/api/problem'), 
      this.http.get('/api/part')
    ]).pipe(
      map(resps=> {
        let count = 0;
        resps.forEach(resp => {
          count += resp['ok'];
          if(resp['parts']){

            this.parts = [];
            resp['parts'].forEach(p => {
              this.parts.push({
                area: p['area'],
                client: p['client'],
                department: p['department'],
                location: p['location'],
                number: p['number']
              });
            });

          }else if(resp['problems']){
            
            this.problems = [];
            resp['problems'].forEach(p => {
              this.problems.push({
                description: p['description'],
                id: p['id']
              });
            });

          }
        });
        this.errorMessage = "Couldn't retieve data from server";
        return count == resps.length;
      }, catchError(error=> {
        this.errorMessage = "Server error";
        console.log(error);
        return of(false);
      }))
    );
  }

  public getParts() : Part[]{
    return this.parts;
  }

  public getDefectives() : Defective[]{
    return this.problems;
  }
}
