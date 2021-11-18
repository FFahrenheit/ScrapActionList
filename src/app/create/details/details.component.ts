import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Defective, Part } from 'src/app/interfaces/resources.items.interface';
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

  public form : FormGroup;
  public selectedPart : Part = null;

  constructor(private resources : ResourcesService,
             private alert      : AlertService,
             private fb         : FormBuilder) { }

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
      evaluationPeriod: ['', Validators.required],
      defective: [null, Validators.required],
      description: ['', Validators.required],
      area: [{
        value: '',
        disabled: true
      }, Validators.required],
      department: [{
        value: '',
        disabled: true
      }, Validators.required]
    });
    
  }

  public get(ctrl : string) : AbstractControl{
    return this.form.controls[ctrl];
  }

  public getClass(ctrl : string) : string{
    const fc = this.get(ctrl);
    if(!fc.touched){
      return '';
    }
    console.log({
      name: ctrl,
      dis: fc.disabled,
      val: fc.value
    })
    return fc.valid || (fc.disabled && fc.value)? 'is-valid' : 'is-invalid';
  }

  public onChange(){
    this.selectedPart = this.parts.find( e => e.number == this.get('part').value);
    this.get('client').setValue(this.selectedPart.client);
    this.get('area').setValue(this.selectedPart.area);
    this.get('department').setValue(this.selectedPart.department);
    this.form.updateValueAndValidity();
  }

  public submit() : void{
    console.log('Submit...');
    console.log(this.form);
  }

}
