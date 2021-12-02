import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Defective, Part } from 'src/app/interfaces/resources.items.interface';
import { issueTypes } from 'src/app/resources/defective.options';
import { ResourcesService } from 'src/app/services/resources.service';
import { AlertService } from 'src/app/shared/alert';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  public parts : Part[];
  public defectives : Defective[];
  public types : string[] = issueTypes;

  public form : FormGroup;
  public customerForm : FormGroup;
  public selectedPart : Part = null;
  public isCustomer : boolean;

  constructor(private resources : ResourcesService,
             private alert      : AlertService,
             private fb         : FormBuilder,
             private router     : Router) { }

  ngOnInit(): void {
    this.resources.loadResources().subscribe(resp => {
      if(resp){
        this.parts = this.resources.getParts();
        this.defectives = this.resources.getDefectives();
        console.log({
          defectives: this.defectives,
          parts: this.parts
        });
      }else{
        this.alert.error(this.resources.getMessage());
      }
    },error=>{
      this.alert.error(this.resources.getMessage());
    });
    
    this.form = this.fb.group({
      part : [null, Validators.required],
      client: [{
        value: '',
        disabled: true
      }, Validators.required],
      // evaluationPeriod: ['', Validators.required],
      defective: [null, Validators.required],
      description: ['', Validators.required],
      area: [{
        value: '',
        disabled: true
      }, Validators.required],
      department: [{
        value: '',
        disabled: true
      }, Validators.required],
      type: [null, Validators.required]
    });

    this.get('type').valueChanges.subscribe(p => {
      this.isCustomer = p === 'Customer incident';
    })

    this.customerForm = this.fb.group({
      car: ['', Validators.required],
      issued: ['', Validators.required],
      contact: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])]
    });


  }

  public get(ctrl : string, form : FormGroup = this.form) : AbstractControl{
    return form.controls[ctrl];
  }

  public getClass(ctrl : string, form : FormGroup = this.form) : string{
    const fc = this.get(ctrl, form);
    if(!fc.touched){
      return '';
    }
    return fc.valid || (fc.disabled && fc.value)? 'is-valid' : 'is-invalid';
  }

  public onChange(){
    this.selectedPart = this.parts.find( e => e.number == this.get('part').value);
    this.get('client').setValue(this.selectedPart.client);
    this.get('area').setValue(this.selectedPart.area);
    this.get('department').setValue(this.selectedPart.department);
    this.form.updateValueAndValidity();
  }

  public continue() : void{
    if(this.isValid()){
      console.log('Valid!');
      this.router.navigate(['create', 'team']);
    }else{
      this.form.markAllAsTouched();
    }
  }

  public isValid() : boolean{
    return this.form.valid && ((this.customerForm.valid && this.isCustomer) || !this.isCustomer);
  }

  public submit(){
    this.router.navigate(['create', 'team']);
  }
}
