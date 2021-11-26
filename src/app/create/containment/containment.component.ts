import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Participant } from 'src/app/interfaces/resources.items.interface';
import { ResourcesService } from 'src/app/services/resources.service';
import { AlertService } from 'src/app/shared/alert';
import { stocks } from './containment.stock.resources';

@Component({
  selector: 'app-containment',
  templateUrl: './containment.component.html',
  styleUrls: ['./containment.component.scss']
})
export class ContainmentComponent implements OnInit {

  public form : FormGroup;
  public stock : FormGroup;
  public users : Participant[]; 

  constructor(private fb        : FormBuilder,
              private resources : ResourcesService,
              private alert     : AlertService) { }

  ngOnInit(): void {
    this.resources.loadResources().subscribe(resp=> {
      if(resp){
        this.users = this.resources.getUsers();
      }else{
        this.alert.error("Couldn't retrieve users");
      }
    });

    this.stock = this.fb.group({
      containment: this.fb.array([])
    });

    stocks.forEach( s => {
      const stock = this.fb.group({
        enabled : [true],
        description : [{
          value: s,
          ensabled: false
        }],
        total: ['', Validators.required],
        ok: ['', Validators.required],
        notOk: ['', Validators.required],
        clean: ['', Validators.required],
        responsible: [null, Validators.required]
      });

      this.containment.push(stock);
    });
  }

  public get containment() : FormArray{
    return this.stock.get('containment') as FormArray;
  }

  public getClass(form : any, field : string) : string{
    const input = (form as FormGroup).controls[field];
    if(input.untouched || ! (form as FormGroup).controls['enabled'].value){
      return '';
    }
    return input.valid ? 'is-valid' : 'is-invalid';
  }

  public getDescription(form : any) : string {
    return (form as FormGroup).controls['description'].value.value;  //Why? Idk ... 
  }

  public isEnabled(form : any) : boolean{
    return (form as FormGroup).controls['enabled'].value;
  }
}
