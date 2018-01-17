import {Component, Injectable, InjectionToken, Injector, OnInit, ReflectiveInjector} from '@angular/core';
import {CompCommunicationService} from '../comp-communication.service';

import {SparqlResult} from '../model/sparql-result.model';
import {SparqlResultUrlComponent} from './results/sparql-result-url/sparql-result-url.component';

@Component({
  selector: 'app-query-result',
  templateUrl: './query-result.component.html',
  styleUrls: ['./query-result.component.css']
})
export class QueryResultComponent implements OnInit {

  private _results: Object;
  private _table: SparqlResult[][] = [];

  constructor(private communication: CompCommunicationService) {
  }

  ngOnInit() {
    this._results = this.communication.sparqlResult;
    this.parseResult();
  }

  parseResult() {
    for (const index in this._results) {
      if (this._results.hasOwnProperty(index)) {
        const res = this._results[index];
        const resComp: SparqlResult[] = [];
        for (const key in res) {
          if (res.hasOwnProperty(key)) {
            resComp.push({cls: SparqlResultUrlComponent, value: res[key]['value']});
          }
        }
        this._table.push(resComp);
      }
    }
  }


  createInjector(value: string): Injector {
    return
  }
}
