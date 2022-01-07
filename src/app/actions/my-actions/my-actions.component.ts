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

  public loadedActions = null;
  public filteredActions = null;
  
  public filterModel : string = '';
  public issues : string = '';

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
            this.loadedActions = this.actionsService.getMyActions();
            this.filteredActions = this.loadedActions;
            this.filterActions();
          }else{
            this.alert.error(this.actionsService.getMessage());
          }
        });
  }

  public filterActions(){
    let issues = this.loadedActions?.map(a => a.issueId);
    issues = Array.from(new Set(issues));
    this.issues = issues;
    console.log(this.issues);
  }

  public actionDetails(issue : string, id : string){
    this.router.navigate(['actions', 'details', issue, id]);
  }

  public change($event){
    let filter = $event.target.value;
    console.log({filter});
    this.filterModel = filter;
    this.filteredActions = this.loadedActions.filter( a => this.filterModel == '' || a.issueId == this.filterModel);
  }

  public get actions(){
    return this.filteredActions;
  }

}
