import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Customer, Defective, Department, Part, Participant } from '../interfaces/resources.items.interface';
import { AppService } from '../models/service.model';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService extends AppService{
  private parts : Part[];
  private problems : Defective[];
  private participants : Participant[];
  private departments : Department[];
  private customers : Customer[];

  constructor(private http : HttpClient) { 
    super();
  }

  public loadResources(){
    return forkJoin([
      this.http.get('/api/problem'), 
      this.http.get('/api/part'),
      this.http.get('/api/users'),
      this.http.get('/api/department'),
      this.http.get('/api/customer')
    ]).pipe(
      map(resps=> {
        let count = 0;
        console.log(resps);
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
                number: p['number'],
                clientId: p['clientId']
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

          }else if(resp['users']){

            this.participants = [];
            resp['users'].forEach( u => {
              
              this.participants.push({
                email: u['email'],
                name: u['name'],
                username: u['username'],
                position: u['position']  
              });

            });
          }else if(resp['departments']){

            this.departments = [];            
            resp['departments'].forEach( d => {
              
              this.departments.push({
                id: d['id'],
                manager: d['manager'],
                name: d['name']  
              });

            });
          }
          else if(resp['customers']){

            this.customers = [];            
            resp['customers'].forEach( c => {
              
              this.customers.push({
                id: c['id'],
                name: c['name']  
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

  public getUsers() : Participant[]{
    return this.participants;
  }

  public getDepartments() : Department[]{
    return this.departments;
  }

  public getCustomers() : Customer[]{
    return this.customers;
  }

  public getAreas() : string[]{
    let areas = this.parts.map(p => p.area);
    return Array.from(new Set(areas));
  }

  public getStatus() : string[]{
    return Array(9).fill('').map((_, i) => 'D' + i);
  }
}
