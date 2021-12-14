import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetFileService {

  constructor() { }

  public retrieveFile(issue : string, filename : string) : string{
    return `/api/upload/${ issue }/${ filename }`;
  }
}
