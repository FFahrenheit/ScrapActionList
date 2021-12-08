import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/alert';

@Component({
  selector: 'app-all-issues',
  templateUrl: './all-issues.component.html',
  styleUrls: ['./all-issues.component.scss']
})
export class AllIssuesComponent implements OnInit {

  public issues = null;

  constructor(/*private devicesService  : DevicesService,*/
              private router          : Router,
              private alert           : AlertService) { }

  ngOnInit(): void {
    // this.loadDevices();
  }

  // public deviceDetails(id : string){
  //   this.router.navigate(['equipos','detalles',id]);
  // }

  // private loadDevices(req = this.devicesService.getSavedFilters()) : void{
  //   this.devicesService.loadDevices(req)
  //       .subscribe(resp=>{
  //         if(resp){
  //           this.devices = this.devicesService.getDevices();
  //         }else{
  //           this.alert.error(this.devicesService.getError());
  //         }
  //       },error=>{
  //         this.alert.error(this.devicesService.getError());
  //       });
  // }

  // public appyFilters($event){
  //   this.loadDevices($event);
  // }

  // public resetFilters(){
  //   this.devicesService.resetFilters();
  //   this.loadDevices();
  // }

}
