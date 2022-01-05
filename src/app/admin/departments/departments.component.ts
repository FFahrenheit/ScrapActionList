import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Department, Participant } from 'src/app/interfaces/resources.items.interface';
import { AdministrationService } from 'src/app/services/administration.service';
import { ResourcesService } from 'src/app/services/resources.service';
import { AlertService } from 'src/app/shared/alert';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit {

  public departments : Department[];
  public users : Participant[];

  public form : FormGroup;

  constructor(private resources     : ResourcesService,
              private alert         : AlertService,
              private fb            : FormBuilder,
              private adminService  : AdministrationService) { }

  ngOnInit(): void {
    this.resources.loadResources().subscribe(
      resp => {
        if(resp){
          this.departments = this.resources.getDepartments();
          this.users = this.resources.getUsers();
          this.initForm();
        }else{
          this.alert.error(this.resources.getMessage());
        }
      }
    );
  }

  public initForm() : void{
    this.form = this.fb.group({});

    this.departments.forEach(d => {
      this.form.addControl(
        d.name,
        this.fb.control(d.manager, Validators.required)
      );
    });
  }

  get departmentForm(){
    return Object.keys(this.form.controls);
  } 

  get halfList(){
    const middle = Math.ceil(this.departmentForm.length / 2);
    return [
      this.departmentForm.splice(0, middle),
      this.departmentForm.splice(middle)
    ];
  }

  getClass(ctrl : string){
    if(this.get(ctrl).untouched){
      return '';
    }

    return this.get(ctrl).valid? 'is-valid' : 'is-invalid';
  }

  get(ctrl : string) : AbstractControl{
    return this.form.controls[ctrl];
  }

  submit(){
    let departments = [];
    this.departmentForm.forEach(dpt => {
      departments.push({
        name: dpt,
        manager: this.get(dpt).value
      });
    });

    this.adminService.updateManagers(departments).subscribe(
      resp=>{
        if(resp){
          this.alert.success("Departments updated");
        }else{
          this.alert.error(this.adminService.getMessage());
        }
      });

  }
}
