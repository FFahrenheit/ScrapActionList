import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { GetIssueService } from 'src/app/services/get-issue.service';
import { AlertService } from '../alert';

@Component({
  selector: 'issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss']
})
export class IssueComponent implements OnInit {

  @Input() public id : string = '';
  @Input() public title : string = '';

  public issue = null;
  public exists : boolean | null = null;
  public error : string | null = '';
  
  public status = '';
  @Input() public active : number = 0;
  @Input() alertEnabled : boolean = true;
  public Ds = ['d0', 'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8'];

  @Output() public receive = new EventEmitter<any>();

  constructor(private issueService  : GetIssueService,
              private alert         : AlertService,
              public datePipe       : DatePipe,
              private router        : Router,
              private auth          : AuthService
              ) { }

  ngOnInit(): void {
    this.issueService.loadIssue(this.id)
        .subscribe(resp=>{
          this.exists = resp;
          if(this.exists){
            this.issue = this.issueService.getIssue();
          }else{
            this.alert.error(this.issueService.getMessage());
          }

          this.receive.emit(this.issue);
        });
  }

  public getClass(id : number) : string{
    if(id == 6 && this.issue.status == 'D5'){
      return this.active === id ? 'd-active' : 'd-link';
    }
    if(id != 0 && ! this.issue['d' + id]){
      return 'd-disabled'; //Doesn't exists
    }
    return this.active === id ? 'd-active' : 'd-link';
  }

  public getQAURL():string{
    return `https://interplexgroup.sharepoint.com/americas/imx/imx_qms/IMX_QAlert/Forms/Public%20View.aspx`;
  }

  public addActions() : void{
    this.router.navigate(['create', this.id, 'action-list']);
  }

  public isOwner() : boolean{
    return this.issue.username == this.auth.getLoggedUser().username;
  }
}
