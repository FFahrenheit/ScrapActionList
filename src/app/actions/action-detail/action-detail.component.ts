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

  constructor(private route : ActivatedRoute,
              private title : Title) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.issueId = params.get('issueId');
      this.actionId = params.get('actionId');
      this.title.setTitle(`Action #${ this.actionId } on issue #${ this.issueId }`);
    });
  }

}
