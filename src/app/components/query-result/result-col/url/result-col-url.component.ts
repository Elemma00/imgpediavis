import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-result-col-url',
  templateUrl: './result-col-url.component.html',
  styleUrls: ['./result-col-url.component.css']
})
export class ResultColUrlComponent implements OnInit {

  @Input() values: string[];

  constructor() {
  }

  ngOnInit() {}
}


