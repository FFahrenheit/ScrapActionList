import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { D1User } from 'src/app/interfaces/create.issue.interface';
import { Participant } from 'src/app/interfaces/resources.items.interface';
import { CreateService } from 'src/app/services/create.service';
import { ResourcesService } from 'src/app/services/resources.service';
import { AlertService } from 'src/app/shared/alert';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  public userList : Participant[];

  public usersForm : FormGroup;
  public users : D1User;

  constructor(private resources : ResourcesService,
              private alert     : AlertService,
              private fb        : FormBuilder,
              private create    : CreateService) { }

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

    this.usersForm = this.fb.group({
      team: this.fb.array([]) 
    });

    if(this.create.getTeam() && this.create.getTeam().length > 0){
      this.create.getTeam().forEach(t => {
        
        const participant = this.fb.group({
          member: [t.member, Validators.required],
          position: [t.position, Validators.required],
          email: [{
            value: t.email,
            disabled: true
          }, Validators.required],
          name: [{
            value: t.name,
            disabled: true
          }, Validators.required]
        });

        this.team.push(participant);
      });

    }else{
      Array(3).fill('').forEach(_=>this.addMember());
    }

  }

  public addMember() : void{
    this.team.push(this.fb.group({
      member: [null, Validators.required],
      position: ['', Validators.required],
      email: [{
        value: '',
        disabled: true
      }, Validators.required],
      name: [{
        value: '',
        disabled: true
      }, Validators.required]
    }));
  }

  public deleteMember(index : number) : void{
    this.team.removeAt(index);
  } 

  public getClass(participant : any /* FormGroup*/, field: string) : string{
    const input = (participant as FormGroup).controls[field];
    if(input.untouched){
      return '';
    }

    return input.valid || (input.disabled && input.value) ? 'is-valid' : 'is-invalid';

  }

  public get team(): FormArray{
    return this.usersForm.get('team') as FormArray;
  }

  public setValues(member : any /* FormGroup*/) : void{
    member = member as FormGroup;
    const username = member.controls['member'].value;
    const selectedUser = this.userList.find(u => u.username === username);

    member.controls['name'].setValue(selectedUser.name);
    member.controls['email'].setValue(selectedUser.email);

    console.log({
      username
    })

  }
}
