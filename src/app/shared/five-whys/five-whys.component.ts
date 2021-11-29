import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'five-why',
  templateUrl: './five-whys.component.html',
  styleUrls: ['./five-whys.component.scss']
})
export class FiveWhysComponent implements OnInit {

   @Input() question : string = 'Why?'; 
   @Input() whys : string[] = [''];
   @Output() whysChange = new EventEmitter<string[]>();
   
  constructor() { }

  ngOnInit(): void {
    if( typeof this.whys === 'undefined' || this.whys == null || this.whys.length == 0 ) {
      this.whys = [''];
    }
  }

  public deleteAt(index : number){
    this.whys = this.whys.slice(0, index);
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  public addWhy(index : number) : void{
    this.whysChange.emit(this.whys);
    if(this.whys[index].length > 0 && this.whys.length === (index + 1)){
      this.whys.push('');
    }
  }

  public getClass(index : number) : string {
    if(this.whys.length === ( index + 1 )){
      return this.whys[index].length > 0 ? 'is-valid' : '';
    }
    return this.whys[index].length > 0 ? 'is-valid' : 'is-invalid';
  }

}
