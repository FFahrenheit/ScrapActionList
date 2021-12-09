import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {


  @Input() public name = 'Title';
  @Input() public value = 'Value';
  // @Input() public status = '';

  constructor() { }

  ngOnInit(): void {
  }

}
