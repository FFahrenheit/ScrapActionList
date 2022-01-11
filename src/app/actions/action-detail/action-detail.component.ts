import { DatePipe, TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUpload } from 'src/app/interfaces/upload.interface';
import { ActionsService } from 'src/app/services/actions.service';
import { AlertService } from 'src/app/shared/alert';

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
  public files : File[] = null;
  public actionType : number = 0;
  public loaded = false;

  constructor(private route     : ActivatedRoute,
              private title     : Title,
              public datePipe   : DatePipe,
              public titleCase  : TitleCasePipe,
              private actions   : ActionsService,
              private alert     : AlertService,
              private router    : Router) { }

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
      this.issue.d5.actions = this.issue.d5?.actions.map(a => ({...a, type: 'Corrective'}));

      if(this.issue.d7){
        this.issue['d7']['actions'] = this.issue.d7?.actions.map(a => ({...a, type: 'Preventive'}));
      }

      const actions = (this.issue.d5?.actions || []).concat( this.issue.d7?.actions || []);
      this.action = actions.find(a => a.id == this.actionId) || null;

      this.actionType = this.action ? this.action.type == 'Corrective' ? 5 : 7 : 0;
      console.log({ actions, action: this.action }); 
      this.loaded = true;
    }
  }

  public getFiles($event){
    this.files = $event;
    console.log(this.files);
  }

  public continue(){
    const files : FileUpload = {
      description: `Evidence for action #${ this.actionId } closure`,
      files: this.files,
      issue: this.issueId
    };

    let type = this.action.type == 'corrective' ? 'D6' : 'D7';

    this.actions.closeAction(this.actionId, files, this.issueId, type)
                .subscribe(resp=> {
                  if(resp){
                    this.alert.success("Action closed");
                    setTimeout(() => {
                      this.router.navigate(['issues', 'details', this.issueId]);
                    }, 2500);
                  }else{
                    this.alert.error(this.actions.getMessage());
                  }
                });
  }
}
