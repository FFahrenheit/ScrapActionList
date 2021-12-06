import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Department, Participant } from 'src/app/interfaces/resources.items.interface';
import { ResourcesService } from 'src/app/services/resources.service';
import { AlertService } from 'src/app/shared/alert';

@Component({
  selector: 'app-preventive-actions',
  templateUrl: './preventive-actions.component.html',
  styleUrls: ['./preventive-actions.component.scss']
})
export class PreventiveActionsComponent implements OnInit {

  public userList : Participant[];
  public departments : Department[];

  public options = ['Yes', 'No', 'N/A'];

  public actionForm : FormGroup;
  public form : FormGroup;

  public fmea : File = null;
  public control : File = null;

  constructor(private resources : ResourcesService,
              private alert     : AlertService,
              private fb        : FormBuilder,
              private router    : Router) { }

  ngOnInit(): void {
    this.resources.loadResources().subscribe(resp => {
      if(resp){
        this.userList = this.resources.getUsers();
        this.departments = this.resources.getDepartments();
      }else{
        this.alert.error(this.resources.getMessage());
      }
    },error=>{
      console.log('Error' + error);
      this.alert.error(this.resources.getMessage());
    });
    this.actionForm = this.fb.group({
      actions: this.fb.array([]) 
    });
    this.addAction();

    this.form = this.fb.group({
      fmea: [null, Validators.required],
      readAcross: [null, Validators.required],
      lessons: [null, Validators.required],
      control: [null, Validators.required],
      fmeaFile: [''],
      controlFile: ['']
    });
  }

  public fileClass(file){
    const files = {
      fmea: {
        file: this.fmea,
        form: this.get('fmeaFile'),
        parent: this.get('fmea')
      },
      control:{
        file: this.control,
        form: this.get('controlFile'),
        parent: this.get('control')
      }
    };
    const obj = files[file];

    if(obj.form.untouched || !this.isFileRequired(file)){
      return '';
    }
    return this.isFileValid(file) ? 'is-valid' : 'is-invalid'; 
    
  }

  public addAction() : void{
    this.actions.push(this.fb.group({
      responsible: [null, Validators.required],
      due: ['', Validators.required],
      description: ['', Validators.required],
      department: [null, Validators.required]
    }));
  }

  public deleteAction(index : number) : void{
    this.actions.removeAt(index);
  } 

  public getClass(participant : any /* FormGroup*/, field: string) : string{
    const input = (participant as FormGroup).controls[field];
    if(input.untouched){
      return '';
    }
    return input.valid || (input.disabled && input.value) ? 'is-valid' : 'is-invalid';
  }

  public getClassForm(ctrl : string){
    if(this.get(ctrl).untouched){
      return '';
    }
    return this.get(ctrl).valid? 'is-valid' : 'is-invalid';
  }

  public get(ctrl) : AbstractControl{
    return this.form.controls[ctrl];
  }

  public get actions(): FormArray{
    return this.actionForm.get('actions') as FormArray;
  }

  public submit() : void{
    let body = this.prepare();
    // this.router.navigate(['create', 'problem']);
  }

  private prepare(){
    let actions = this.actions.value;

    actions = actions.map(a => 
      ({
        ...a,
        type: 'corrective',
        status: 'open',
      })
    );


    const { fmeaFile, controlFile, ...closure } = this.form.value;

    console.log({
      actions, closure
    });

    return {
      actions: actions
    }

  }

  public continue() : void{
    if(this.actionForm.valid){
      this.submit();
    }else{
      this.actionForm.markAllAsTouched();
    }
  }

  public isValid(){
    return this.form.valid && this.actionForm.valid && 
      this.isFileValid('fmea') && this.isFileValid('control');
  }

  isFileRequired(file : string){
    if(file == 'fmea'){
      return this.get('fmea').value == 'Yes';
    }else if(file == 'control'){
      return this.get('control').value == 'Yes';
    }
    return false;
  }

  isFileValid(file : string){
    if(file == 'fmea'){
      return !this.isFileRequired(file) || this.fmea != null;
    }else if(file == 'control'){
      return !this.isFileRequired(file) || this.control != null;
    }
    return true;
  }

  public fileEvent($event, file){
    if($event.target.files.length > 0){
      if(file == 'fmea'){
        this.fmea = $event.target.files[0] as File;
      }else if(file == 'control'){
        this.control = $event.target.files[0] as File;
      }
    }else{
      if(file == 'fmea'){
        this.fmea = null;
      }else if(file == 'control'){
        this.control = null;
      }
    }
  }

  public trigger(){
    this.actionForm.markAllAsTouched();
    this.form.markAllAsTouched();
  }
}
