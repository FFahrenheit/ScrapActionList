import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private route : ActivatedRoute) { }

  ngOnInit(): void {

  }

  public getClass(id : number) : string{
    return this.active === id ? 'd-active' : 'd-link';
  }

}
