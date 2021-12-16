import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionsService } from 'src/app/services/actions.service';
import { AlertService } from 'src/app/shared/alert';

@Component({
  selector: 'app-my-actions',
  templateUrl: './my-actions.component.html',
  styleUrls: ['./my-actions.component.scss']
})
export class MyActionsComponent implements OnInit {

  public actions = null;

  constructor(private actionsService : ActionsService,
              private alert          : AlertService,
              private router         : Router) { }

  ngOnInit(): void {
    this.loadActions();
  }

  public loadActions(){
    this.actionsService.loadMyActions()
        .subscribe(resp => {
          if(resp){
            this.actions = this.actionsService.getMyActions();
          }else{
            this.alert.error(this.actionsService.getMessage());
          }
        });
  }

  public actionDetails(issue : string, id : string){
    this.router.navigate(['actions', 'details', issue, id]);
  }

}
