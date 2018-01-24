import { Component, OnInit } from '@angular/core';

import {MainService} from '../../services/main.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CompCommunicationService} from '../../services/comp-communication.service';
import {errorSymbol} from '@angular/compiler-cli/src/metadata/evaluator';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  textValue: string;
  headers: Object;
  results: Object;
  errorMessage: string;

  private _query: string;

  static parseQueryToUrl(query: string): string {
    return query.replace(/\n/g, '')
      .replace(/ /g, '+')
      .replace(/\?/g, '%3F')
      .replace(/{/g, '%7B')
      .replace(/}/g, '%7D')
      .replace(/:/g, '%3A')
      .replace(/\//g, '%2F')
      .replace(/#/g, '%23')
      .replace(/;/g, '%3B');
  }

  static parseQueryToText(query: string): string {
    return query
      .replace(/\+/g, ' ')
      .replace(/%3F/g, '?')
      .replace(/%7B/g, '{')
      .replace(/%7D/g, '}')
      .replace(/%3A/g, ':')
      .replace(/%2F/g, '/')
      .replace(/%23/g, '#')
      .replace(/%3B/g, ';')
      .replace(/;/g, ';\n')
      .replace(/ \./g, ' .\n');
  }

  constructor(private route: ActivatedRoute,
    private service: MainService,
    private communication: CompCommunicationService,
    private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['q'] && params['q'].length > 0) {
        this._query = MainComponent.parseQueryToUrl(params['q']);
        this.textValue = MainComponent.parseQueryToText(this._query);
        this.runSparqlQuery();
      } else {
        this._query = null;
      }
    });
  }

  runQuery() {
    if (this.textValue && this.textValue.length > 0) {
      this.router.navigate(['query', {q: MainComponent.parseQueryToUrl(this.textValue)}]);
    }
  }

  runSparqlQuery() {
      this.service.getImgpediaSparqlQuery(this._query).subscribe(
        res => {
          this.headers = res['head']['vars'];
          this.results = res['results']['bindings'];
          if (this.errorMessage) {
            this.errorMessage = null;
          }
        },
        error => {
          if (this.headers && this.results) {
            this.headers = null;
            this.results = null;
          }
          if (error.status === 400) {
            this.errorMessage = error.error.substr(error.error.indexOf('SPARQL'));
          }
          if (error.status === 500) {
            this.errorMessage = 'Internal server error';
          }
        }
      );
  }
}


