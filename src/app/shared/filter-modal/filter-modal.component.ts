import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Customer, Part } from 'src/app/interfaces/resources.items.interface';
import { ResourcesService } from 'src/app/services/resources.service';

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss']
})
export class FilterModalComponent implements OnInit {

  public parts : Part[];
  public customers : Customer[];
  public areas : string[];

  constructor(private modalService    : NgbModal,
              private formBuilder     : FormBuilder,
              private resources       : ResourcesService) { }

  ngOnInit(): void {
    this.resources.loadResources().subscribe(
      resp=>{
        this.parts = this.resources.getParts();
        this.customers = this.resources.getCustomers();
        this.areas = this.resources.getAreas();
      }
    );
  }

}
