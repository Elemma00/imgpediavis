import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-sparql-result-url',
  templateUrl: './sparql-result-url.component.html',
  styleUrls: ['./sparql-result-url.component.css']
})
export class SparqlResultUrlComponent implements OnInit {

  @Input() value: string;

  constructor() {
  }

  ngOnInit() {}
}


