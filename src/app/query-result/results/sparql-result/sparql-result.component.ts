import {Component, Inject, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-sparql-result',
  templateUrl: './sparql-result.component.html',
  styleUrls: ['./sparql-result.component.css'],
})
export class SparqlResultComponent implements OnInit {

  @Input() value: string;

  constructor( ) {
  }

  ngOnInit() { }

  get registryValue(): string {
    return this.value;
  }

}
