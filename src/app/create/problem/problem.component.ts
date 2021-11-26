import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/alert';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.scss']
})
export class ProblemComponent implements OnInit {

  public form : FormGroup;
  public options = ['Yes', 'No'];

  constructor(private fb      : FormBuilder,
              private alert   : AlertService,
              private router  : Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      whatIs : ['', Validators.required ],
      whereIs : ['', Validators.required ],
      whenIs : ['', Validators.required ],
      whoIs : ['', Validators.required ],
      whyIs : ['', Validators.required ],
      much : ['', Validators.required ],
      often : ['', Validators.required ],
      customerPN : ['', Validators.required ],
      pnDescription : ['', Validators.required ],
      description : ['', Validators.required ],
      repeated : [null, Validators.required ],
      finalAffected : [null, Validators.required ],
      customerAffected : [null, Validators.required ],
    });
  }

  public get(ctrl : string){
    return this.form.controls[ctrl];
  }

  public getClass(ctrl : string) : string{
    if (this.get(ctrl).untouched){
      return ''
    };
    return this.get(ctrl).valid ? 'is-valid' : 'is-invalid';
  }

  public continue() : void{
    if(this.form.valid){
      this.submit();
    }else{
      this.form.markAllAsTouched();
    }
  }

  public submit() : void{
    console.log('Wait...');
  }

}
