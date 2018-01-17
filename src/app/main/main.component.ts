import { Component, OnInit } from '@angular/core';

import {MainService} from '../main.service';
import {Router} from '@angular/router';
import {CompCommunicationService} from '../comp-communication.service';

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
    this.textValue = '';
  }

  ngOnInit() {
  }

  runSparqlQuery() {
    if (this.textValue && this.textValue.length > 0) {
      this.service.getImgpediaSparqlQuery(this.textValue).subscribe(
        res => {
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


