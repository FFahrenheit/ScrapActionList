import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FileUpload } from '../interfaces/upload.interface';
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
    let calls = [];

    calls.push(
      this.http.post(`/api/d2/${ id }`, {
        complication: body.complication
      })
    );

    if(body.files){
      calls.push(this.getFileRequest(body.files, id, 'D2'));
    }

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
        this.errorMessage = count == 0 ? "Couldn't update to D2" : 'Partial error';
        return false;
      }),catchError(error=>{
        this.errorMessage = 'Server error';
        return of(false);
      })
    );
  }

  public d3(body, id){
    let calls = [];

    calls.push(
      this.http.post(`/api/d3/${ id }`, {
        stocks: body.stocks,
        containment: body.containment,
      })
    );

    if(body.files){
      calls.push(this.getFileRequest(body.files, id, 'D3'));
    }

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
        this.errorMessage = "Couldn't update to D3";
        return false;
      }),catchError(error=>{
        this.errorMessage = 'Server error';
        return of(false);
      })
    );
  }

  public d4(body, id){
    let calls = [];
    
    calls.push(
      this.http.post(`/api/d4/${ id }`, {
        why: body.why
      })
    );

    calls.push(this.getFileRequest(body.ishikawa, id, 'D4'));

    if(body.files){
      calls.push(this.getFileRequest(body.files, id, 'D4'));
    }

    return forkJoin(calls)
    .pipe(
      map(resps =>{
        let count = 0;
        resps.forEach(r => {
          count += r['ok'];
        });

        if(count == resps.length){
          return true;
        }
        this.errorMessage = count == 0 ? "Couldn't update to D4" : 'Partial error';
        return false;
      }),catchError(error=>{
        this.errorMessage = 'Server error';
        return of(false);
      })
    );
  }

  public d7(body, id){
    let calls = [];
    
    calls.push(
      this.http.post(`/api/d7/${ id }`, {
        actions: body.actions,
        closure: body.closure
      })
    );

    if(body.control){
      calls.push(this.getFileRequest(body.control, id, 'D7'));
    }
    if(body.fmea){
      calls.push(this.getFileRequest(body.fmea, id, 'D7'));
    }

    return forkJoin(calls)
    .pipe(
      map(resps =>{
        let count = 0;
        resps.forEach(r => {
          count += r['ok'];
        });

        if(count == resps.length){
          return true;
        }
        this.errorMessage = count == 0 ? "Couldn't update to D7" : 'Partial error';
        return false;
      }),catchError(error=>{
        this.errorMessage = 'Server error';
        return of(false);
      })
    );
  }

  public d5(body, id){
    return this.http.post(`/api/d5/${ id }`, body)
    .pipe(
      map(resp=>{
        if(resp['ok']){
          return true;
        }
        this.errorMessage = "Couldn't update to D5";
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
