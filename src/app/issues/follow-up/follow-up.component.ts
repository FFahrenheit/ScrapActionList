import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IssuesService } from 'src/app/services/issues.service';
import { AlertService } from 'src/app/shared/alert';

@Component({
  selector: 'app-follow-up',
  templateUrl: './follow-up.component.html',
  styleUrls: ['./follow-up.component.scss']
})
export class FollowUpComponent implements OnInit {


  public issues = null;

  constructor(private issuesService : IssuesService,
              private router        : Router,
              private alert         : AlertService) { }

  ngOnInit(): void {
    this.loadIssues();
  }

  public issueDetails(id : string, status : string){
    //Better implemented in other view...
    if(/^D[0-7]{1}/.test(status)){
      const next = 'd' + (Number(status.substring(1,2))+1);
      console.log({ id , next});
      this.router.navigate(['issues', 'follow-up', id]);
    }else{
      this.alert.warn("There's no follow-up to this issue");
    }
    // this.router.navigate(['equipos','detalles',id]);
  }

  private loadIssues(req = this.issuesService.getSavedFilters()) : void{
    this.issuesService.loadDevices(req, 'mine')
        .subscribe(resp=>{
          if(resp){
            this.issues = this.issuesService.getIssues();
          }else{
            this.alert.error(this.issuesService.getMessage());
          }
        },error=>{
          this.alert.error(this.issuesService.getMessage());
        });
  }

  // public appyFilters($event){
  //   this.loadDevices($event);
  // }

  public resetFilters(){
    this.issuesService.resetFilters();
    this.loadIssues();
  }

}
