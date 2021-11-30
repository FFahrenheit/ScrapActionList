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
  public ishikawa : File;
  public ishikawaTouched = false;
  public happenK = '';
  public happenD = '';
  public happenP = '';

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

  public ishikawaEvent($event){
    this.ishikawaTouched = true;
    if($event.target.files.length > 0){
      this.ishikawa = $event.target.files[0] as File;
    }else{
      this.ishikawa = null;
    }
  }

}
