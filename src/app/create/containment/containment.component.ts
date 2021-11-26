import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-containment',
  templateUrl: './containment.component.html',
  styleUrls: ['./containment.component.scss']
})
export class ContainmentComponent implements OnInit {

  public form : FormGroup;
  public stock : FormGroup;

  constructor(private fb  : FormBuilder) { }

  ngOnInit(): void {
    
  }

}
