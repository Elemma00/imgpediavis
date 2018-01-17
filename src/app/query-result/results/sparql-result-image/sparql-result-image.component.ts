import { Component, OnInit } from '@angular/core';
import {SparqlResultComponent} from '../sparql-result/sparql-result.component';

@Component({
  selector: 'app-sparql-result-image',
  templateUrl: './sparql-result-image.component.html',
  styleUrls: ['./sparql-result-image.component.css']
})
export class SparqlResultImageComponent extends SparqlResultComponent {

  private _fileName: string;

  constructor(value: string) {
    super(value);
    const s = value.split('/');
    this._fileName = s[s.length - 1];
  }
}


