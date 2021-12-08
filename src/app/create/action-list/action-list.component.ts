import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Department, Participant } from 'src/app/interfaces/resources.items.interface';
import { ResourcesService } from 'src/app/services/resources.service';
import { AlertService } from 'src/app/shared/alert';

@Component({
  selector: 'app-action-list',
  templateUrl: './action-list.component.html',
  styleUrls: ['./action-list.component.scss']
})
export class ActionListComponent implements OnInit {

  public userList : Participant[];
  public departments : Department[]

  public actionForm : FormGroup;

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
  }

  public addAction() : void{
    this.actions.push(this.fb.group({
      responsible: [null, Validators.required],
      due: ['', Validators.required],
      description: ['', Validators.required],
      department: [null, Validators.required],
      justification: [null]
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
        justification: 
          (this.isDaysAway(new Date(a.due.replace(/-/g, '\/')), 30))? a.justification : null,
        type: 'corrective',
        status: 'open',
      })
    );
    console.log(actions)

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

  public isJustifyRequired(participant : any) : boolean{
    const form = participant as FormGroup;
    const input = form.controls['due'];
    if(input.value){
      let date = new Date(input.value.replace(/-/g, '\/'));
      if(this.isDaysAway(date, 30)){
        form.controls['justification'].setValidators(Validators.required);
        form.controls['justification'].updateValueAndValidity();
        return true;
      }
      form.controls['justification'].clearValidators();
      form.controls['justification'].updateValueAndValidity();
      return false;
    }
    return false;
  }

  public isDaysAway(date : Date, days : number){
    let today = new Date();
    today.setHours(0,0,0,0);
    date.setHours(0,0,0,0);
    let difference = date.getTime() - today.getTime();
    difference = Math.ceil(difference / (1000 * 3600 * 24));
    return difference >= days;
  }
}
