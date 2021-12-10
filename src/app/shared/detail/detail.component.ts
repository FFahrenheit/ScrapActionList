import { Component, Input, OnInit } from '@angular/core';
import { IconsAlert } from 'src/app/util/iconst.alert';

@Component({
  selector: 'detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {


  @Input() public name = 'Title';
  @Input() public value = 'Value';
  @Input() public status = '';

  public icons = IconsAlert.icons;
  
  constructor() { }

  ngOnInit(): void {
  }

}
