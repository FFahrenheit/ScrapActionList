import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUpload } from 'src/app/interfaces/upload.interface';
import { CreateService } from 'src/app/services/create.service';
import { AlertService } from 'src/app/shared/alert';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.scss']
})
export class ProblemComponent implements OnInit {

  public id : string | null = '';
  public form : FormGroup;
  public options = ['Yes', 'No'];
  private files : File[] = [];

  constructor(private fb      : FormBuilder,
              private alert   : AlertService,
              private router  : Router,
              private route   : ActivatedRoute,
              private create  : CreateService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });

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
      failureMode: ['', Validators.required],
      description : ['', Validators.required ],
      repeated : [null, Validators.required ],
      finalAffected : [null, Validators.required ],
      customerAffected : [''],
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
    let data = this.getData();
    this.create.d2(data, this.id).subscribe(resp=>{
      if(resp){
        this.alert.success('Problem defined');
        setTimeout(() => {
          this.router.navigate(['issues', 'details', this.id]);
        }, 2500);
      }else{
        this.alert.error(this.create.getMessage());
      }
    }
  );
  }

  private getData() : any{
    let resp = this.form.value;
    let files : FileUpload = null;
    
    if(this.files && this.files.length > 0){
      files = {
        description: 'Problem resources',
        files: this.files,
        issue: this.id
      };
    }

    console.log({ resp, files });
    return { 
      complication: resp,
      files: files 
    };
  }

  public changeCustomer($event){
    let value = $event.target.value;
    if(value == 'Yes'){
      this.get('customerAffected').setValidators(Validators.required);
    }else{
      this.get('customerAffected').clearValidators();
    }
    this.get('customerAffected').updateValueAndValidity();
  }

  public getFiles($event){
    this.files = $event;
    console.log(this.files);
  }
}