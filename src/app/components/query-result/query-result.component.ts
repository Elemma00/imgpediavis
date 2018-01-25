import {Component, Input, OnChanges, OnInit, SimpleChange} from '@angular/core';

import {ResultCol} from '../../models/sparql-result.model';
import {ResultColUrlComponent} from './result-col/url/result-col-url.component';
import {Constants} from '../../models/constants.model';
import {ResultColValComponent} from './result-col/val/result-col-val.component';
import {ResultColImageComponent} from './result-col/image/result-col-image.component';
import {ResultColNullComponent} from './result-col/null/result-col-null.component';

@Component({
  selector: 'app-query-result',
  templateUrl: './query-result.component.html',
  styleUrls: ['./query-result.component.css']
})
export class QueryResultComponent implements OnInit, OnChanges {

  @Input() headers: string[] = [];
  @Input() results: Object;
  columns: {[id: string]: ResultCol};
  colWidth: string;

  constructor() {}

  ngOnInit() {
    this.colWidth = (100 / this.headers.length) + '%';
    if (this.headers && this.headers.length > 0 && this.results && Object.keys(this.results).length > 0) {
      this.columns = null;
      this.prepareColumns();
      this.parseResult();
    }
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    this.ngOnInit();
  }


    headerLength(): number {
    return this.headers.length;
  }

  columnsKeys(): string[] {
    return Object.keys(this.columns);
  }

  prepareColumns() {
    let i;
    this.columns = {};
    const first = this.results[0];
    for (const h in this.headers) {
      if (first.hasOwnProperty(this.headers[h])) {
        const v = first[this.headers[h]]['value'];

        for (const uV in Constants.URL_VALUES) {
          if ((i = v.indexOf(Constants.URL_VALUES[uV])) > -1) {
            this.columns[this.headers[h]] = {cls: ResultColValComponent, values: []};
            break;
          }
        } if (i > -1) {
          continue;
        }

        if (Constants.IMAGE_FORMATS.indexOf(v.substr(v.lastIndexOf('.') + 1, 3).toLowerCase()) !== -1) {
          this.columns[this.headers[h]] = {cls: ResultColImageComponent, values: []};
        } else if (first[this.headers[h]]['type'].localeCompare('typed-literal') === 0) {
          this.columns[this.headers[h]] = {cls: ResultColValComponent, values: []};
        } else {
          this.columns[this.headers[h]] = {cls: ResultColUrlComponent, values: []};
        }
      } else {
        this.columns[this.headers[h]] = {cls: ResultColNullComponent, values: ['' + Object.keys(this.results).length]};
      }
    }
  }

  parseResult() {
    for (const index in this.results) {
      if (this.results.hasOwnProperty(index)) {
        const res = this.results[index];
        const keys = Object.keys(res);
        for (const k in keys) {
          if (res.hasOwnProperty(keys[k])) {
            this.columns[keys[k]].values.push(res[keys[k]]['value']);
          }
        }
      }
    }
  }
}

