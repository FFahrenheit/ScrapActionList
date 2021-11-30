import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Participant } from 'src/app/interfaces/resources.items.interface';
import { ResourcesService } from 'src/app/services/resources.service';
import { AlertService } from 'src/app/shared/alert';

@Component({
  selector: 'app-action-list',
  templateUrl: './action-list.component.html',
  styleUrls: ['./action-list.component.scss']
})
export class ActionListComponent implements OnInit {

  public userList : Participant[];

  public actionForm : FormGroup;

  constructor(private resources : ResourcesService,
              private alert     : AlertService,
              private fb        : FormBuilder,
              private router    : Router) { }

  ngOnInit(): void {
    this.resources.loadResources().subscribe(resp => {
      if(resp){
        this.userList = this.resources.getUsers();
      }else{
        this.alert.error(this.resources.getMessage());
      }
    },error=>{
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
    // this.router.navigate(['create', 'problem']);
  }

  public continue() : void{
    if(this.actionForm.valid){
      this.submit();
    }else{
      this.actionForm.markAllAsTouched();
    }
  }

}
