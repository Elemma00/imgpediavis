import {Component, Input, OnInit} from '@angular/core';
import {Constants} from '../../../../models/constants.model';

@Component({
  selector: 'app-result-col-url',
  templateUrl: './result-col-url.component.html',
  styleUrls: ['./result-col-url.component.css']
})
export class ResultColUrlComponent implements OnInit {

  @Input() values: string[];
  @Input() ncolumns: number;
  rowHeight = Constants.QUERY_RESULT_ROW_HEIGHT;

  constructor() {
  }

  ngOnInit() {}
}


