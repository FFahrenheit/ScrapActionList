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

  public isValid() : boolean{
    const happen = this.happen.filter(h => h.length > 0);
    const prevent = this.prevent.filter(h => h.length > 0);
    const detect = this.detect.filter(h => h.length > 0);

    return happen.length > 0 && prevent.length > 0 && detect.length > 0 &&
      this.happenD.length > 0 && this.happenK.length > 0 && this.happenP.length > 0
      && this.ishikawa != null;
  }

  public submit() : void{
    console.log('Alla vamos');
  }

}
