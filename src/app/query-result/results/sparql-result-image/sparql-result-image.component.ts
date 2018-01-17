import {Component, Input, OnInit} from '@angular/core';
import {MainService} from '../../../main.service';

@Component({
  selector: 'app-sparql-result-image',
  templateUrl: './sparql-result-image.component.html',
  styleUrls: ['./sparql-result-image.component.css'],
})
export class SparqlResultImageComponent implements OnInit {


  @Input() value: string;
  fileNames: string[] = [];
  private _thumbUrl: string;

  constructor(private service: MainService) { }

  ngOnInit() {
    const s = this.value.split('/');
    this.fileNames.push(s[s.length - 1]);
    this.getImgUrl();
  }

  getImgUrl() {
    this.service.getImgUrl(this.fileNames[0], 300).subscribe(res => {
      const pages = res.query.pages;
      for (const key in pages) {
        if (pages.hasOwnProperty(key)) {
          this._thumbUrl = pages[key].imageinfo[0].thumburl;
        }
      }
    });
  }
}


