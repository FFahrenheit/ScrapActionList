import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  public active : number = 0;

  @Output() public receive = new EventEmitter<any>();

  constructor(private issueService  : GetIssueService,
              private alert         : AlertService,
              public datePipe       : DatePipe
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
    return this.active === id ? 'd-active' : 'd-link';
  }

}
