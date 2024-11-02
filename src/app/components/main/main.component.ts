import { Component, OnInit } from '@angular/core';

import {HttpService} from '../../services/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';

import { QueryParser } from '../../utils/query-parser';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  textValue: string;
  previousTextValue: string;
  headers: Object;
  results: Object;
  errorMessage: string;
  loading: boolean;

  constructor(private route: ActivatedRoute,
    private http: HttpService,
    private router: Router,
    private location: Location) {

    this.loading = false;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['q'] && params['q'].length > 0) {
        this.textValue = QueryParser.urlParamToText(params['q']);
        this.runSparqlQuery();
      } else {
        this.textValue = 'SELECT ?Source ?Target ?Distance WHERE{ ?Rel <http://imgpedia.dcc.uchile.cl/ontology#sourceImage> ?Source;\n' +
          ' <http://imgpedia.dcc.uchile.cl/ontology#targetImage> ?Target;\n' +
          ' <http://imgpedia.dcc.uchile.cl/ontology#distance> ?Distance .\n' +
          '} LIMIT 10';
      }
    });
  }

  onTextChange(newValue: string) {
    this.previousTextValue = newValue;
  }

  headersLength(): number {
    return Object.keys(this.headers).length;
  }

  resultsLength(): number {
    return Object.keys(this.results).length;
  }

  runQuery() {
    if (this.textValue && this.textValue.length > 0) {
      this.runSparqlQuery();
    }
  }

  runSparqlQuery() {
    this.headers = null;
    this.results = null;
    this.loading = true;
    this.location.go('/query/' + QueryParser.textToUrlParam(this.textValue));
    this.http.getImgpediaSparqlQuery(this.textValue).subscribe(
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


