import {Component, Input, OnInit} from '@angular/core';

import {SparqlResult} from '../../models/sparql-result.model';
import {SparqlResultUrlComponent} from './results/sparql-result-url/sparql-result-url.component';
import {Constants} from '../../models/constants.model';
import {SparqlResultValComponent} from './results/sparql-result-val/sparql-result-val.component';
import {SparqlResultImageComponent} from './results/sparql-result-image/sparql-result-image.component';

@Component({
  selector: 'app-query-result',
  templateUrl: './query-result.component.html',
  styleUrls: ['./query-result.component.css']
})
export class QueryResultComponent implements OnInit {

  @Input() headers: string[] = [];
  @Input() results: Object;
  private _table: SparqlResult[] = [];

  constructor() {}

  ngOnInit() {
    if (this.headers && this.headers.length > 0 && this.results && Object.keys(this.results).length > 0) {
      this.parseResult();
    }
  }

  headerLength(): number {
    return this.headers.length;
  }

  parseResult() {
    for (const index in this.results) {
      if (this.results.hasOwnProperty(index)) {
        const res = this.results[index];
        for (const key in this.headers) {
          if (res.hasOwnProperty(this.headers[key])) {
            if (Constants.IMAGE_FORMATS.indexOf(res[this.headers[key]]['value'].substr(res[this.headers[key]]['value'].lastIndexOf('.') + 1, 3).toLowerCase()) !== -1) {
              this._table.push({cls: SparqlResultImageComponent, value: <string>res[this.headers[key]]['value']});
            } else if (res[this.headers[key]]['type'].localeCompare('typed-literal') === 0) {
              this._table.push({cls: SparqlResultValComponent, value: <string>res[this.headers[key]]['value']});
            } else {
              this._table.push({cls: SparqlResultUrlComponent, value: <string>res[this.headers[key]]['value']});
            }
          } else {
            this._table.push({cls: SparqlResultValComponent, value: 'NO-DATA'});
          }
        }
      }
    }
  }
}

