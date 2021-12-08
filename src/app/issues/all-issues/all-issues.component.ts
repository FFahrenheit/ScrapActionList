import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IssuesService } from 'src/app/services/issues.service';
import { AlertService } from 'src/app/shared/alert';

@Component({
  selector: 'app-all-issues',
  templateUrl: './all-issues.component.html',
  styleUrls: ['./all-issues.component.scss']
})
export class AllIssuesComponent implements OnInit {

  public issues = null;

  constructor(private issuesService : IssuesService,
              private router        : Router,
              private alert         : AlertService) { }

  ngOnInit(): void {
    this.loadIssues();
  }

  public issueDetails(id : string){
    console.log(id);
    // this.router.navigate(['equipos','detalles',id]);
  }

  private loadIssues(req = this.issuesService.getSavedFilters()) : void{
    this.issuesService.loadDevices(req)
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

  // public resetFilters(){
  //   this.devicesService.resetFilters();
  //   this.loadDevices();
  // }

}
