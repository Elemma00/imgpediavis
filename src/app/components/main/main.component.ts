import { Component, OnInit } from '@angular/core';

import {MainService} from '../../services/main.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CompCommunicationService} from '../../services/comp-communication.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  textValue: string;
  headers: Object;
  results: Object;
  private _query: string;

  static parseQuery(query: string): string {
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

  constructor(private route: ActivatedRoute,
    private service: MainService,
    private communication: CompCommunicationService,
    private router: Router) {
    this.textValue = 'SELECT ?source ?dbp ?wiki ?target ?desc ?dist WHERE{\n' +
      '?rel <http://imgpedia.dcc.uchile.cl/ontology#sourceImage> ?source ;\n' +
      '    <http://imgpedia.dcc.uchile.cl/ontology#targetImage> ?target ;\n' +
      '    <http://imgpedia.dcc.uchile.cl/ontology#usesDescriptorType> ?desc ;\n' +
      '    <http://imgpedia.dcc.uchile.cl/ontology#distance> ?dist .\n' +
      'FILTER(?source = URI(\'http://imgpedia.dcc.uchile.cl/resource/HaHaskalaa011.jpg\'))\n' +
      'OPTIONAL{\n' +
      '?source <http://imgpedia.dcc.uchile.cl/ontology#associatedWith> ?dbp .\n' +
      '?source <http://imgpedia.dcc.uchile.cl/ontology#appearsIn> ?wiki .\n' +
      '}\n' +
      '}';
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['q'] && params['q'].length > 0) {
        this._query = MainComponent.parseQuery(params['q']);
        this.runSparqlQuery();
      }
    });
  }

  runQuery() {
    if (this.textValue && this.textValue.length > 0) {
      this.router.navigate(['query', {q: MainComponent.parseQuery(this.textValue)}]);
    }
  }

  runSparqlQuery() {
      this.service.getImgpediaSparqlQuery(this._query).subscribe(
        res => {
          this.headers = res['head']['vars'];
          this.results = res['results']['bindings'];
        },
        error => {
          console.error(error);
        }
      );
  }
}


