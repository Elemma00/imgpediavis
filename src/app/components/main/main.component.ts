import { Component, OnInit } from '@angular/core';

import {HttpService} from '../../services/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';

import { QueryParser } from '../../utils/query-parser';

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
  loading: boolean;

  private _query: string;

  constructor(private route: ActivatedRoute,
    private http: HttpService,
    private router: Router,
    private location: Location) {

    this.loading = false;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['q'] && params['q'].length > 0) {
        this._query = QueryParser.parseQueryToUrl(params['q']);
        if (!this.textValue) {
          this.textValue = QueryParser.parseQueryToText(this._query);
        }
        this.runSparqlQuery();
      } else {
        this._query = null;
        this.textValue = 'SELECT ?Source ?Target ?Distance WHERE{ ?Rel <http://imgpedia.dcc.uchile.cl/ontology#sourceImage> ?Source;\n' +
          ' <http://imgpedia.dcc.uchile.cl/ontology#targetImage> ?Target;\n' +
          ' <http://imgpedia.dcc.uchile.cl/ontology#distance> ?Distance .\n' +
          '} LIMIT 10';
      }
    });
  }

  headersLength(): number {
    return Object.keys(this.headers).length;
  }

  resultsLength(): number {
    return Object.keys(this.results).length;
  }

  runQuery() {
    if (this.textValue && this.textValue.length > 0) {
      this.location.go('/query;q=' + QueryParser.parseTextToUrl(this.textValue));
      this._query = QueryParser.parseTextToQuery(this.textValue);
      this.runSparqlQuery();
    }
  }

  runSparqlQuery() {
    this.headers = null;
    this.results = null;
    this.loading = true;
    this.http.getImgpediaSparqlQuery(this._query).subscribe(
      res => {
        this.headers = res['head']['vars'];
        this.results = res['results']['bindings'];
        if (this.errorMessage) {
          this.errorMessage = null;
        }
        if (this.loading) {
          this.loading = false;
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
          this.errorMessage = 'Internal server errorn\n' + error.error;
        }
        if (this.loading) {
          this.loading = false;
        }
      }
    );
  }
}


