import {Component, Injectable, InjectionToken, Injector, OnInit, ReflectiveInjector} from '@angular/core';
import {CompCommunicationService} from '../comp-communication.service';

import {SparqlResult} from '../model/sparql-result.model';
import {SparqlResultUrlComponent} from './results/sparql-result-url/sparql-result-url.component';
import {Constants} from '../model/constants.model';
import {SparqlResultValComponent} from './results/sparql-result-val/sparql-result-val.component';
import {SparqlResultImageComponent} from './results/sparql-result-image/sparql-result-image.component';

@Component({
  selector: 'app-query-result',
  templateUrl: './query-result.component.html',
  styleUrls: ['./query-result.component.css']
})
export class QueryResultComponent implements OnInit {

  private _results: Object;
  private _table: SparqlResult[] = [];
  private _headers: string[] = [];

  constructor(private communication: CompCommunicationService) {
  }

  ngOnInit() {
    this._results = this.communication.sparqlResult;
    this._headers = this.communication.sparqlHeaders;
    this.parseResult();
    console.log(this._table);
  }

  headerLength(): number {
    return this._headers.length;
  }

  parseResult() {
    for (const index in this._results) {
      if (this._results.hasOwnProperty(index)) {
        const res = this._results[index];
        for (const key in this._headers) {
          if (res.hasOwnProperty(this._headers[key])) {
            if (Constants.IMAGE_FORMATS.indexOf(res[this._headers[key]]['value'].substr(res[this._headers[key]]['value'].lastIndexOf('.') + 1, 3).toLowerCase()) !== -1) {
              this._table.push({cls: SparqlResultImageComponent, value: <string>res[this._headers[key]]['value']});
            } else if (res[this._headers[key]]['type'].localeCompare('typed-literal') === 0) {
              this._table.push({cls: SparqlResultValComponent, value: <string>res[this._headers[key]]['value']});
            } else {
              this._table.push({cls: SparqlResultUrlComponent, value: <string>res[this._headers[key]]['value']});
            }
          } else {
            this._table.push({cls: SparqlResultValComponent, value: 'NO-DATA'});
          }
        }
      }
    }
  }
}

