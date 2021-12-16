import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Participant } from 'src/app/interfaces/resources.items.interface';
import { FileUpload } from 'src/app/interfaces/upload.interface';
import { CreateService } from 'src/app/services/create.service';
import { ResourcesService } from 'src/app/services/resources.service';
import { AlertService } from 'src/app/shared/alert';
import { stocks } from './containment.stock.resources';

@Component({
  selector: 'app-containment',
  templateUrl: './containment.component.html',
  styleUrls: ['./containment.component.scss']
})
export class ContainmentComponent implements OnInit {

  public id : string = '';
  public form: FormGroup;
  public stock: FormGroup;
  public users: Participant[];
  private files : File[] = [];

  constructor(private fb        : FormBuilder,
              private resources : ResourcesService,
              private alert     : AlertService,
              private router    : Router,
              private route     : ActivatedRoute,
              private create    : CreateService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });

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
        description: [s],
        total: ['', Validators.required],
        ok: ['', Validators.required],
        notOk: ['', Validators.required],
        clean: ['', Validators.required],
        responsible: ['', Validators.required]
      });

      this.containment.push(stock);
    });

    this.form = this.fb.group({
      others: ['', Validators.required],
      sites: [''],
      containment: [''],
      //Aquí se cambia la RegEx
      QA: ['', Validators.compose([Validators.required, Validators.pattern('QA-[a-zA-Z]{3,}-[0-9]{5}')])],
      poka: ['', Validators.required],
      robust: ['', Validators.required]
    });
  }

  public get(ctrl : string){
    return this.form.controls[ctrl];
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
    let data = this.getData();
    this.create.d3(data, this.id).subscribe(resp=>{
      if(resp){
        this.alert.success('Containment defined');
        setTimeout(() => {
          this.router.navigate(['issues', 'details', this.id]);
        }, 2500);
      }else{
        this.alert.error(this.create.getMessage());
      }
    }
  );
  }

  public triggered(){
    this.form.markAllAsTouched();
    this.stock.markAllAsTouched();
    this.getData();
  }

  public getData() : any{
    let stocks = this.containment.controls as any;

    stocks = stocks.filter(f => f.controls['enabled'].value) //Get enabled forms
                   .map(f => (f.value))  //Get its value
                   .map(({enabled, ...keep}) => 
                          ({...keep, issue: this.id})); //Delete not important properties and add issue id

    let containment = this.form.value;
    containment.issue = this.id;
    
    let files : FileUpload = null;
    
    if(this.files && this.files.length > 0){
      files = {
        description: 'Stock containment resources',
        files: this.files,
        issue: this.id
      };
    }

    const body = {
      stocks: stocks,
      containment,
      files: files
    };

    console.log(body);
    return body;
  }

  public getFiles($event){
    this.files = $event;
    console.log(this.files);
  }

  public getQAURL():string{
    return `https://interplexgroup.sharepoint.com/americas/imx/imx_qms/IMX_QAlert/Forms/Public%20View.aspx`;
  }
}
