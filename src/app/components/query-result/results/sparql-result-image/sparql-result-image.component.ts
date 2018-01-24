import {Component, Input, OnInit} from '@angular/core';
import {MainService} from '../../../../services/main.service';
import {Constants} from '../../../../models/constants.model';

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
          if (+key >= 0) {
            this._thumbUrl = pages[key].imageinfo[0].thumburl;
          } else {
            this._thumbUrl = Constants.IMG_MISSING_URL;
          }
        }
      }
    });
  }
}


