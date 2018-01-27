import {Component, Input, OnInit} from '@angular/core';
import {Constants} from '../../../../models/constants.model';

@Component({
  selector: 'app-result-col-null',
  templateUrl: './result-col-null.component.html',
  styleUrls: ['./result-col-null.component.css']
})
export class ResultColNullComponent implements OnInit {

  @Input() values: string[];
  @Input() ncolumns: number;
  cells: Array<boolean>;
  rowHeigth = Constants.QUERY_RESULT_ROW_HEIGHT;

  constructor() { }

  ngOnInit() {
    this.cells = new Array<boolean>(+this.values[0]);
  }

}
