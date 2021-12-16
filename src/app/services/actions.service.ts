import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppService } from '../models/service.model';
import { TimeCalculator } from '../resources/time.calculator';

@Injectable({
  providedIn: 'root'
})
export class ActionsService extends AppService {

  private actions = null;

  constructor(private http : HttpClient) { super(); }

  public loadMyActions(){
    return this.http.get('/api/actions/self')
              .pipe(
                map(resp => {
                  if(resp['ok']){
                    this.actions = resp['actions'];
                    this.actions = this.actions.map(a => ({
                      ...a, 
                      daysLeft: TimeCalculator.daysDiff(a.due)
                    }));
                    return true;
                  }
                  this.errorMessage = "Couldn't get actions";
                  return false;
                }), catchError(error => {
                  console.log(error);
                  this.errorMessage = 'Server error';
                  return of(false);
                })
              );
  }

  public getMyActions(){
    return this.actions;
  }
}
