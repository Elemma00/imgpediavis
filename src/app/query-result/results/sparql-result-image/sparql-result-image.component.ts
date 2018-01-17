import {Component, Input, OnInit} from '@angular/core';
import {MainService} from '../../../main.service';

@Component({
  selector: 'app-sparql-result-image',
  templateUrl: './sparql-result-image.component.html',
  styleUrls: ['./sparql-result-image.component.css'],
})
export class SparqlResultImageComponent implements OnInit {


  @Input() value: string;
  fileName: string;
  private _imgUrl: string;
  private _thumbUrl: string;

  constructor(private service: MainService) {
  }

  ngOnInit() {
    const s = this.value.split('/');
    this.fileName = s[s.length - 1];
    this.getImgUrl();
  }

  getImgUrl() {
    this.service.getImgUrl(this.fileName, 200).subscribe(res => {
      const pages = res.query.pages;
      for (const key in pages) {
        if (pages.hasOwnProperty(key)) {
          this._imgUrl = pages[key].imageinfo[0].url;
          this._thumbUrl = pages[key].imageinfo[0].thumburl;
        }
      }
    });
  }
}


