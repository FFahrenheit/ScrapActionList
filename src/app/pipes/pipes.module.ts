import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SizePipe } from './size.pipe';
import { FilenamePipe } from './filename.pipe';



@NgModule({
  declarations: [
    SizePipe,
    FilenamePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SizePipe,
    FilenamePipe
  ],
  providers: [
    SizePipe
  ]
})
export class PipesModule { 
  static forRoot(){
    return {
      ngModule: PipesModule,
      providers: [],
    }
  }
}
