import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FileUpload } from '../interfaces/upload.interface';
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

  public closeAction(id : string, file : FileUpload, issueId : string){
    let calls = [];

    calls.push(
      this.http.put(`/api/action/${ issueId }/${ id }`, {})
    );

    calls.push(
      this.getFileRequest(file, issueId, 'D6')
    );

    return forkJoin(calls)
          .pipe(
            map(resps=>{
              let count = 0;
              resps.forEach(r => {
                count += r['ok'];
              });
      
              if(count == resps.length){
                return true;
              }
              this.errorMessage = count == 0 ? "Couldn't close action" : 'Partial error';
              return false;
            }), catchError(error=>{
              this.errorMessage = 'Server error';
              console.error(error);
              return of(false);
            })
          );
  }

  private getFileRequest(body : FileUpload, id : string, d : string){
    let headers = new HttpHeaders();
    headers.set('Content-Type','multipart/form-data');
    let formData = new FormData;
    body.files.forEach(file=>{
      formData.append("multi-files", file);
    });
    formData.append('description', body.description);

    return this.http.post(`/api/upload/${ id }/${ d }`, 
      formData,{
        headers: headers
      });
  }
}
