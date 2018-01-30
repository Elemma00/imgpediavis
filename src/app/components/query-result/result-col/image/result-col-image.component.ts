import {Component, Input, OnInit} from '@angular/core';
import {HttpService} from '../../../../services/http.service';
import {Constants} from '../../../../models/constants.model';
import {FilenameThumbnail} from '../../../../models/filename-thumbnail.model';

@Component({
  selector: 'app-result-col-image',
  templateUrl: './result-col-image.component.html',
  styleUrls: ['./result-col-image.component.css'],
})
export class ResultColImageComponent implements OnInit {

  @Input() values: string[];
  @Input() ncolumns: number;
  thumbs: FilenameThumbnail[];
  rowHeight = Constants.QUERY_RESULT_ROW_HEIGHT;

  private _fileNames: Set<string>;

  constructor(private http: HttpService) {
    this._fileNames = new Set<string>();
  }

  ngOnInit() {
    this.cleanValues();
    this.thumbs = new Array<FilenameThumbnail>(this.values.length);
    for (const v in this.values) {
      if (this.values.hasOwnProperty(v)) {
        const s = this.values[v].split('/');
        const filename = s[s.length - 1];
        let i;
        if ((i = filename.indexOf('File:')) === 0) {
          this._fileNames.add(filename.substr(5));
        } else {
          this._fileNames.add(filename);
        }
      }
    }
    this.getImgsUrls();
  }

  cleanValues() {
    for (const v in this.values) {
      if (this.values.hasOwnProperty(v)) {
        const s = this.values[v].split('/');
        let newValue = s[s.length - 1];
        if (newValue.indexOf('File:') > -1) {
          newValue = newValue.substr(5);
        }
        this.values[v] = newValue;
      }
    }
  }

  getImageIndexes(title: string): number[] {
    const r: number[] = [];
    const t = title.substr(5).replace(/ /g, '_');
    for (let i = 0; i < this.values.length; i++) {
      if (this.values[i].localeCompare(t) === 0) {
        r.push(i);
      }
    }
    return r;
  }

  getImgsUrls() {
    const a_fileNames = Array.from(this._fileNames);
    for (let i = 0, j = a_fileNames.length; i < j; i += Constants.MAX_WIKI_REQUEST) {
      this.http.getSimilarImgInfo(a_fileNames.slice(i, i + Constants.MAX_WIKI_REQUEST), 300).subscribe(res => {
        const pages = res.query.pages;
        for (const key in pages) {
          if (pages.hasOwnProperty(key)) {
            const indexes = this.getImageIndexes(pages[key].title);
            if (+key >= 0) {
              for (const k in indexes) {
                if (indexes[k] < this.values.length) {
                  this.thumbs[indexes[k]] = {
                    fileName: pages[key].title.substr(5).replace(/ /g, '_'),
                    thumb: pages[key].imageinfo[0].thumburl
                  };
                }
              }
            } else {
              for (const k in indexes) {
                if (indexes[k] < this.values.length) {
                  this.thumbs[indexes[k]] = {fileName: pages[key].title.substr(5), thumb: Constants.IMG_MISSING_URL};
                }
              }
            }
          }
        }
        console.log(this.thumbs);
      });
    }
  }
}


