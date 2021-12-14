import { Component, Input, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { GetFileService } from 'src/app/services/get-file.service';

@Component({
  selector: 'file-view',
  templateUrl: './file-view.component.html',
  styleUrls: ['./file-view.component.scss']
})
export class FileViewComponent implements OnInit {

  @Input() public resources = [];
  @Input() public filter = '';
  
  public files;

  constructor(private getFile : GetFileService) { }

  ngOnInit(): void {
    this.files = this.resources.filter( f => f.description.startsWith(this.filter));
  }

  getHref(file) : string {
    return this.getFile.retrieveFile(file.issue, file.filename);
  }

}
