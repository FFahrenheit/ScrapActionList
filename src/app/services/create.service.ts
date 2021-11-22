import { Injectable } from '@angular/core';
import { D1User } from '../interfaces/create.issue.interface';
import { AppService } from '../models/service.model';

@Injectable({
  providedIn: 'root'
})
export class CreateService extends AppService{

  private team : D1User[] = [];

  constructor() { 
    super();
  }

  public getTeam() : D1User[] {
    return this.team;
  }

}
