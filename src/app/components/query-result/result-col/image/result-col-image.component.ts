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
    this.thumbs = new Array<FilenameThumbnail>(this.values.length);
    for (const v in this.values) {
      if (this.values.hasOwnProperty(v)) {
        const s = this.values[v].split('/');
        this._fileNames.add(s[s.length - 1]);
      }
    }
    this.getImgsUrls();
  }

  getImageIndexes(title: string): number[] {
    const r: number[] = [];
    const t = Constants.IMGPEDIA_URL + '/resource/' + title.substr(5).replace(/ /g, '_');
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
              for (const i in indexes) {
                if (indexes[i] < this.values.length) {
                  this.thumbs[indexes[i]] = {
                    fileName: pages[key].title.substr(5).replace(/ /g, '_'),
                    thumb: pages[key].imageinfo[0].thumburl
                  };
                }
              }
            } else {
              for (const i in indexes) {
                if (indexes[i] < this.values.length) {
                  this.thumbs[indexes[i]] = {fileName: pages[key].title.substr(5), thumb: Constants.IMG_MISSING_URL};
                }
              }
            }
          }
        }
      });
    }
  }
}


