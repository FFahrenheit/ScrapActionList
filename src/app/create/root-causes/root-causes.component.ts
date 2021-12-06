import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) { }

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

  private prepare() : any { 
    const resp = Object.create(null);
    resp.why = [];
    resp.why.push({
      question: 'Why did it happen?',
      keyFindings: this.happenD,
      answers: this.happen.filter(h => h != '').join('%%')
    });

    resp.why.push({
      question: "Why didn't we detect it?",
      keyFindings: this.happenK,
      answers: this.detect.filter(h => h != '').join('%%')
    });

    resp.why.push({
      question: "Why couldn't we prevent it?",
      keyFindings: this.happenP,
      answers: this.prevent.filter(h => h != '').join('%%')
    });


    console.log(resp);
    return resp;
  }

  public submit() : void{
    let resp = this.prepare();    
    // this.router.navigate(['create', 'action-list']);
  }

}
