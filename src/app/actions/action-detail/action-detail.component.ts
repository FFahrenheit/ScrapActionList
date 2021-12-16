import { DatePipe, TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-action-detail',
  templateUrl: './action-detail.component.html',
  styleUrls: ['./action-detail.component.scss']
})
export class ActionDetailComponent implements OnInit {

  public actionId : string = '';
  public issueId : string = '';
  public issue = null;
  public action = null;

  constructor(private route     : ActivatedRoute,
              private title     : Title,
              public datePipe   : DatePipe,
              public titleCase  : TitleCasePipe) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.issueId = params.get('issueId');
      this.actionId = params.get('actionId');
      this.title.setTitle(`Action #${ this.actionId } on issue #${ this.issueId }`);
    });
  }

  getIssue($event){
    this.issue = $event;
    if(this.issue){
      const actions = (this.issue.d5?.actions || []).concat( this.issue.d7?.actions || []);
      this.action = actions.find(a => a.id == this.actionId) || null;
      console.log({ actions, action: this.action }); 
    }
  }

}
