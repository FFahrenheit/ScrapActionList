import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NextSteps } from 'src/app/resources/next.step';
import { AuthService } from 'src/app/services/auth.service';
import { CreateService } from 'src/app/services/create.service';
import { AlertService } from 'src/app/shared/alert';

@Component({
  selector: 'app-issue-follow-up',
  templateUrl: './issue-follow-up.component.html',
  styleUrls: ['./issue-follow-up.component.scss']
})
export class IssueFollowUpComponent implements OnInit {

  public issue : any = null;
  public next = null;
  public id : string | null = '';
  private nextSteps = NextSteps;

  constructor(private route   : ActivatedRoute,
              private alert   : AlertService,
              private router  : Router,
              private title   : Title,
              private auth    : AuthService,
              private create  : CreateService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.title.setTitle(`Issue #${ this.id } follow up`);
    });
  }

  getIssue($event){
    this.issue = $event;
    if(this.issue){
      const status = this.issue.status;
      if(/^D[0-7]{1}/.test(status)){
        this.next = 'd' + (Number(status.substring(1,2))+1);
      }
    }
  }

  public goToNext(){
    if(this.next){
      this.router.navigate(['create', this.id, this.nextSteps[this.next]]);
    }else{
      this.alert.warn('This issue has no follow-up');
    }
  }

  public canClose(){
    return this.auth.getLoggedUser().manager.length > 0;
  }
  
  public preventiveDone(){
    return this.issue.d7.actions.every(a => a.status == 'closed');
  }

  public addPreventive(){
    this.router.navigate(['create', this.id, this.nextSteps['d7.5']]);
  }

  public closeIssue(){
    this.create.d8(this.id).subscribe(resp=>{
      if(resp){
        this.alert.success('Issue closed');
        setTimeout(() => {
          this.router.navigate(['issues', 'details', this.id]);
        }, 2500);
      }else{
        this.alert.error(this.create.getMessage());
      }
    }
  );
  }
}
