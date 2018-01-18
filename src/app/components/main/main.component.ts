import { Component, OnInit } from '@angular/core';

import {MainService} from '../../services/main.service';
import {Router} from '@angular/router';
import {CompCommunicationService} from '../../services/comp-communication.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  textValue: string;

  constructor(
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
  }

  runSparqlQuery() {
    if (this.textValue && this.textValue.length > 0) {
      this.service.getImgpediaSparqlQuery(this.textValue).subscribe(
        res => {
          this.communication.saveSparqlHeader(res['head']['vars']);
          this.communication.saveSparqlResult(res['results']['bindings']);
          this.router.navigate(['query']);
        },
        error => {
          console.error(error);
        }
      );
    }
  }
}


