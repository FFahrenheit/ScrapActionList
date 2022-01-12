import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'five-why',
  templateUrl: './five-whys.component.html',
  styleUrls: ['./five-whys.component.scss']
})
export class FiveWhysComponent implements OnInit {

  @Input() question: string = 'Why?';
  @Input() whys: string[] = [''];
  @Output() whysChange = new EventEmitter<string[]>();
  @Input() keyFindings: string = '';
  @Output() keyFindingsChange = new EventEmitter<string>();

  private keyFindingsTouched = false;

  constructor() { }

  ngOnInit(): void {
    if (typeof this.whys === 'undefined' || this.whys == null || this.whys.length == 0) {
      this.whys = [''];
    }
  }

  public deleteAt(index: number) {
    this.whys = this.whys.slice(0, index);
    this.whysChange.emit(this.whys);
  }

  public trackByIndex(index: number, obj: any): any {
    return index;
  }

  public addWhy(index: number): void {
    this.whysChange.emit(this.whys);
    if (this.whys[index].length > 0 && this.whys.length === (index + 1)) {
      this.whys.push('');
    }
  }

  public keyFind(): void {
    this.keyFindingsTouched = true;
    this.keyFindingsChange.emit(this.keyFindings);
  }

  public getClass(index: number): string {
    if (this.whys.length === (index + 1)) {
      return this.whys[index].length > 0 ? 'is-valid' : '';
    }
    return this.whys[index].length > 0 ? 'is-valid' : 'is-invalid';
  }

  public getFindClass(): string {
    if (!this.keyFindingsTouched) {
      return '';
    }
    return this.keyFindings.length > 0 ? 'is-valid' : 'is-invalid';
  }

}
