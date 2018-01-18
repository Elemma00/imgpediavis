import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-sparql-result-val',
  templateUrl: './sparql-result-val.component.html',
  styleUrls: ['./sparql-result-val.component.css']
})
export class SparqlResultValComponent implements OnInit {

  @Input() value: string;

  constructor() {}

  ngOnInit() { }
}


