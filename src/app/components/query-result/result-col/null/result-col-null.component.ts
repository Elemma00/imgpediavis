import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-result-col-null',
  templateUrl: './result-col-null.component.html',
  styleUrls: ['./result-col-null.component.css']
})
export class ResultColNullComponent implements OnInit {

  @Input() values: string[];
  cells: Array<boolean>;

  constructor() { }

  ngOnInit() {
    this.cells = new Array<boolean>(+this.values[0]);
  }

}
