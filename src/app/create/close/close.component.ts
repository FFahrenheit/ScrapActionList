import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CreateService } from 'src/app/services/create.service';
import { AlertService } from 'src/app/shared/alert';

@Component({
  selector: 'app-close',
  templateUrl: './close.component.html',
  styleUrls: ['./close.component.scss']
})
export class CloseComponent implements OnInit {

  public issueId : string = '';
  public issue = null;

  constructor(private route     : ActivatedRoute,
              private alert     : AlertService,
              private router    : Router,
              private auth      : AuthService,
              private create    : CreateService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.issueId = params.get('id');
    });
  }

  getIssue($event){
    this.issue = $event;
  }

  public continue(){
    this.create.d8(this.issueId).subscribe(
      resp=>{
        if(resp){
          this.alert.success("D8 approved");
          setTimeout(() => {
            this.router.navigate(['issues', 'details', this.issueId]);
          }, 2000);
        }else{
          this.alert.error('Could not close issue');
        }
      }
    )
  }

  public canApprove(){
    if( !this.issue || !this.issue.d8){
      return false;
    }
    let approval = this.issue.d8?.authorizations?.find(
        a => a.manager == this.auth.getLoggedUser().username) || null;

    if(!approval){
      return false;
    }

    return approval.date == null; 
  }
}
