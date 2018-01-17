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
  private _table: SparqlResult[][] = [];
  private _headers: string[] = [];

  constructor(private communication: CompCommunicationService) {
  }

  ngOnInit() {
    this._results = this.communication.sparqlResult;
    this._headers = this.communication.sparqlHeaders;
    this.parseResult();
  }

  parseResult() {
    for (const index in this._results) {
      if (this._results.hasOwnProperty(index)) {
        const res = this._results[index];
        const resComp: SparqlResult[] = [];
        for (const key in res) {
          if (res.hasOwnProperty(key)) {
            if (Constants.IMAGE_FORMATS.indexOf(res[key]['value'].substr(res[key]['value'].lastIndexOf('.') + 1, 3).toLowerCase()) !== -1) {
              resComp.push({cls: SparqlResultImageComponent, value: <string>res[key]['value']});
            } else if (res[key]['type'].localeCompare('typed-literal') === 0) {
              resComp.push({cls: SparqlResultValComponent, value: <string>res[key]['value']});
            } else {
              resComp.push({cls: SparqlResultUrlComponent, value: <string>res[key]['value']});
            }
          }
        }
        this._table.push(resComp);
      }
    }
  }
}

