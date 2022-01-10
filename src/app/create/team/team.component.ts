import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  public id : string | null = '';

  public usersForm : FormGroup;
  public users : D1User;

  constructor(private resources : ResourcesService,
              private alert     : AlertService,
              private fb        : FormBuilder,
              private create    : CreateService,
              private router    : Router,
              private route     : ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });

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

    Array(3).fill('').forEach(_=>this.addMember());
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
      }, Validators.required],
      issue: [this.id]
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
  }

  public submit() : void{
    let data = this.getData();
    this.create.d1(data, this.id).subscribe(resp=>{
        if(resp){
          this.alert.success('Team defined');
          setTimeout(() => {
            this.router.navigate(['issues', 'follow-up', this.id]);
          }, 2500);
        }else{
          this.alert.error(this.create.getMessage());
        }
      }
    );
  }

  public continue() : void{
    if(this.usersForm.valid){
      this.submit();
    }else{
      this.usersForm.markAllAsTouched();
    }
  }

  private getData() : any{
    let resp = this.usersForm.value;
    console.log(resp);
    return resp;
  }
}
