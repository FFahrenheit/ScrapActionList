import { Injectable } from '@angular/core';
import { AppService } from '../models/service.model';

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService extends AppService{

  constructor() { super(); }
}
