import { TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Customer, Defective, Part } from 'src/app/interfaces/resources.items.interface';
import { issueTypes } from 'src/app/resources/defective.options';
import { IssuesService } from 'src/app/services/issues.service';
import { ResourcesService } from 'src/app/services/resources.service';

@Component({
  selector: 'filter',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss']
})
export class FilterModalComponent implements OnInit {

  public filterForm : FormGroup = Object.create(null);
  public filters: string[];
  public touched = false;
  public resetTrigger = false;

  @Input() public trigger = 'Apply filters';
  @Input() public title = 'Filter issues';
  @Input() public message = 'Select the filters you want to apply on the issues';
  @Input() public blocked: string[] = [];

  @Output() public apply = new EventEmitter<any>();
  @Output() public cancel = new EventEmitter<any>();
  @Output() public reset = new EventEmitter<any>();

  public parts : Part[];
  public customers : Customer[];
  public areas : string[];
  public defectives : Defective[];
  public statusList : string[];
  public types : string[] = issueTypes;

  constructor(private modalService    : NgbModal,
              private formBuilder     : FormBuilder,
              private resources       : ResourcesService,
              private issuesService   : IssuesService,
              private titleCase       : TitleCasePipe) { }

  ngOnInit(): void {
    this.resources.loadResources().subscribe(
      resp=>{
        if(resp){
          this.parts = this.resources.getParts();
          this.customers = this.resources.getCustomers();
          this.areas = this.resources.getAreas();
          this.defectives = this.resources.getDefectives();
          this.statusList = this.resources.getStatus();
        }else{
          console.log(this.resources.getMessage());
        }
      }
    );

    let saved = this.issuesService.getSavedFilters();

    this.filterForm = this.formBuilder.group({
      id: [saved?.id || ''],
      problem: [saved?.problem || null],
      part: [saved?.part || null],
      customer: [saved?.customer || null],
      status: [saved?.status || null],
      type: [saved?.type || null],
      description: [saved?.description || ''],
      createdFrom: [saved?.createdFrom || ''],
      createdTo: [saved?.createdTo || ''],
      area: [saved?.area || null],
      phase: [saved?.phase || null]
    });
  }

  public open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(result => {
      switch (result) {
        case 'YES':
          const obj = this.getValues();
          this.apply.emit(obj);
          this.touched = true;
          break;
        case 'NO':
          break;
        default:
          console.log('Cancel');
          break;
      }
    }, reason =>{
      this.cancel.emit();
    });

    setTimeout(() => {
      document.getElementById('id_input').focus();
    }, 100);
  }

  public resetForm(): void {
    this.filterForm.reset();
    this.resetTrigger = !this.resetTrigger;
  }

  public getClass(ctrl: string): string {
    const control = this.filterForm.controls[ctrl];
    return !control.touched || control.value == '' ? '' : 'is-valid';
  }

  private  getValues(){
    let filterObject : any = {};
    this.filters = [];

    Object.keys(this.filterForm.controls).forEach(key=>{
      let control = this.filterForm.controls[key].value;
      
      if(control != null && control != ''){

        filterObject[key] = control;
        
        let filter;

        switch(key){
          case 'id':
            filter = 'ID : ' + control;
            break;
          case 'createdFrom':
            filter = 'Created since ' + control;
            break;
            case 'createdTo':
              filter = 'Created until ' + control;
              break;
          case 'area':
          case 'phase':
            filter = this.titleCase.transform(key) + ' : ' + control;
            break;
          default:
            filter = this.titleCase.transform(key + ' : ' + control);          
            break;
        }
        
        this.filters.push(filter);
      }
    });

    return filterObject;
  }
}
