import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NextSteps } from 'src/app/resources/next.step';
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
              private router  : Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
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

  goToNext(){
    if(this.next){
      this.router.navigate(['create', this.id, this.nextSteps[this.next]]);
    }else{
      this.alert.warn('This issue has no follow-up');
    }
  }

}
