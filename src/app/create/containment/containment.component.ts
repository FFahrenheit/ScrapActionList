import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  public form: FormGroup;
  public stock: FormGroup;
  public users: Participant[];
  private files : File[] = [];

  constructor(private fb: FormBuilder,
    private resources: ResourcesService,
    private alert: AlertService,
    private router: Router) { }

  ngOnInit(): void {
    this.resources.loadResources().subscribe(resp => {
      if (resp) {
        this.users = this.resources.getUsers();
      } else {
        this.alert.error("Couldn't retrieve users");
      }
    });

    this.stock = this.fb.group({
      containment: this.fb.array([])
    });

    stocks.forEach(s => {
      const stock = this.fb.group({
        enabled: [true],
        description: [{
          value: s,
          disabled: true
        }],
        total: ['', Validators.required],
        ok: ['', Validators.required],
        notOk: ['', Validators.required],
        clean: ['', Validators.required],
        responsible: [null, Validators.required]
      });

      this.containment.push(stock);
    });

    this.form = this.fb.group({
      others: [null, Validators.required],
      sites: [''],
      containment: [null],
      QA: ['', Validators.required],
      poka: [null, Validators.required],
      robust: [null, Validators.required]
    });
  }

  public get containment(): FormArray {
    return this.stock.get('containment') as FormArray;
  }

  public getClass(form: any, field: string): string {
    const input = (form as FormGroup).controls[field];
    if (input.untouched || !(form as FormGroup).controls['enabled'].value) {
      return '';
    }
    return input.valid ? 'is-valid' : 'is-invalid';
  }

  public getClassForm(field: string): string {
    if (this.form.controls[field].untouched) {
      return '';
    }
    return this.form.controls[field].valid ? 'is-valid' : 'is-invalid';
  }

  public getDescription(form: any): string {
    return (form as FormGroup).controls['description'].value;
  }

  public isEnabled(form: any): boolean {
    return (form as FormGroup).controls['enabled'].value;
  }

  public isValid(): boolean {
    let forms = this.containment.controls as any;

    forms = forms.filter(f => f.controls['enabled'].value); //Enabled forms
    const countValid = forms.filter(f => f.valid).length;   //Filled forms

    if (countValid != forms.length) {
      return false;
    }

    return this.form.valid;
  }

  public continue() {
    let forms = (this.containment.controls as any) //Datatype problems with FormGroup / Array
                .filter( f => f.controls['enabled'].value )
                .map(f => f.value);
    
    console.log(forms);

    console.log(this.form);
  }

  public triggered(){
    this.form.markAllAsTouched();
    this.stock.markAllAsTouched();
    this.getData();
  }

  public submit(){
    // this.alert.error('Acabar validacion');
    if(this.isValid()){
      this.router.navigate(['create', 'root-causes']);
    }
  }

  public getData() : any{
    let stocks = this.containment.controls as any;

    stocks = stocks.filter(f => f.controls['enabled'].value); //Enabled forms
    stocks = stocks.map(f => (f.value));
    stocks = stocks.map(({enabled, ...keep}) => keep); //Delete not important properties

    const body = {
      stocks: stocks,
      containment: this.form.value 
    }

    console.log(body);

    return body;
  }

  public getFiles($event){
    this.files = $event;
    console.log(this.files);
  }
}
