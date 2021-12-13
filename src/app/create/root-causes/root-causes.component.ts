import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateService } from 'src/app/services/create.service';
import { AlertService } from 'src/app/shared/alert';

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

  public id : string = '';

  constructor(private router    : Router,
              private route     : ActivatedRoute,
              private create    : CreateService,
              private alert     : AlertService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
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
      answers: this.happen.filter(h => h != '').join('%%'),
      issue: this.id
    });

    resp.why.push({
      question: "Why didn't we detect it?",
      keyFindings: this.happenK,
      answers: this.detect.filter(h => h != '').join('%%'),
      issue: this.id
    });

    resp.why.push({
      question: "Why couldn't we prevent it?",
      keyFindings: this.happenP,
      answers: this.prevent.filter(h => h != '').join('%%'),
      issue: this.id
    });

    console.log(resp);
    return resp;
  }

  public submit() : void{
    let data = this.prepare();    
    this.create.d4(data, this.id).subscribe(resp=>{
        if(resp){
          this.alert.success('Root causes defined');
          setTimeout(() => {
            this.router.navigate(['issues', 'details', this.id]);
          }, 2500);
        }else{
          this.alert.error(this.create.getMessage());
        }
      }
    );
    // this.router.navigate(['create', 'action-list']);
  }

}
