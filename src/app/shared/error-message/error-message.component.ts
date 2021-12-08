import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent implements OnInit {

  @Input() public title = 'Error';
  @Input() public description = "We couldn't find the requested resource";
  @Input() public type = 'error';
  @Input() public styles = '';
  @Input() public loading = true;
  @Input() public action = 'Go back';
  @Input() public customAction = false;

  @Output() public back = new EventEmitter<any>();

  constructor(public location: Location) { }

  public url: string;
  public error_url = './../../../assets/img/error.jpg';
  public empty_url = './../../../assets/img/empty.png';
  public empty_sub_url = './../../../assets/img/lazy.png';
  public ok_url = './../../../assets/img/happy.jpg';

  public images = {
    'error': 'error.png',
    'empty': 'empty.png',
    'empty-sub': 'lazy.png',
    'ok': 'happy.jpg'
  };

  ngOnInit(): void {
    this.url = 'assets/img/' + (this.images[this.type] || 'error.jpg');
    console.log(this.url);
  }

  public goBack() {
    if (this.customAction) {
      this.back.emit();
    }
    else {
      this.location.back();
    }
  }

  public getImage() : string{
    return this.url;
  }

}
