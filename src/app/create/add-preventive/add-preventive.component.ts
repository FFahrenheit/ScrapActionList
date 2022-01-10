import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Department, Participant } from 'src/app/interfaces/resources.items.interface';
import { CreateService } from 'src/app/services/create.service';
import { ResourcesService } from 'src/app/services/resources.service';
import { AlertService } from 'src/app/shared/alert';

@Component({
  selector: 'app-add-preventive',
  templateUrl: './add-preventive.component.html',
  styleUrls: ['./add-preventive.component.scss']
})
export class AddPreventiveComponent implements OnInit {

  public userList : Participant[];
  public departments : Department[];
  public id;

  public actionForm : FormGroup;
  public today : string;

  constructor(private resources : ResourcesService,
              private alert     : AlertService,
              private fb        : FormBuilder,
              private router    : Router,
              private route     : ActivatedRoute,
              private create    : CreateService,
              private datePipe  : DatePipe) { }

  ngOnInit(): void {
    this.today = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });

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
      responsible: ['', Validators.required],
      due: ['', Validators.required],
      description: ['', Validators.required],
      department: ['', Validators.required],
      justification: ['']
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
    let data = this.prepare();
    this.create.d5(data, this.id).subscribe(resp=>{
        if(resp){
          this.alert.success('Action list modified');
          setTimeout(() => {
            this.router.navigate(['issues', 'follow-up', this.id]);
          }, 2500);
        }else{
          this.alert.error(this.create.getMessage());
        }
      }
    );
  }

  private prepare(){
    let actions = this.actions.value;

    actions = actions.map(a => 
      ({
        ...a,
        justification: '',
        type: 'preventive',
        status: 'open',
        issue: this.id
      })
    );
    console.log(actions);

    return {
      actions: actions
    };
  }

  public continue() : void{
    if(this.actionForm.valid){
      this.submit();
    }else{
      this.actionForm.markAllAsTouched();
    }
  }

}
