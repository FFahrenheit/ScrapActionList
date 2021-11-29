import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root-causes',
  templateUrl: './root-causes.component.html',
  styleUrls: ['./root-causes.component.scss']
})
export class RootCausesComponent implements OnInit {

  public happen : string[] = [];
  public prevent : string[] = [];
  public detect : string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  public continue() : void{
    console.log({
      happen: this.happen,
      prevent: this.prevent,
      detect: this.detect
    });

  }

}
