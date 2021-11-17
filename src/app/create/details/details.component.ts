import { Component, OnInit } from '@angular/core';
import { Defective, Part } from 'src/app/interfaces/resources.items.interface';
import { ResourcesService } from 'src/app/services/resources.service';
import { AlertService } from 'src/app/shared/alert';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  private parts : Part[];
  private defectives : Defective[];

  constructor(private resources : ResourcesService,
             private alert      : AlertService) { }

  ngOnInit(): void {
    this.resources.loadResources().subscribe(resp => {
      if(resp){
        this.parts = this.resources.getParts();
        this.defectives = this.resources.getDefectives();
      }else{
        this.alert.error(this.resources.getMessage());
      }
    },error=>{
      this.alert.error(this.resources.getMessage());
    });
  }

}
