import {Component, Input, OnInit} from '@angular/core';
import {Constants} from '../../../../models/constants.model';

@Component({
  selector: 'app-result-col-val',
  templateUrl: './result-col-val.component.html',
  styleUrls: ['./result-col-val.component.scss']
})
export class ResultColValComponent implements OnInit {

  @Input() values: string[];
  @Input() ncolumns: number;
  parsedValues: string[];
  rowHeight = Constants.QUERY_RESULT_ROW_HEIGHT;

  constructor() {
    this.parsedValues = [];
  }

  ngOnInit() {
    let i;
    for (const v in this.values) {
      if (this.values.hasOwnProperty(v)) {
        for (const uV in Constants.URL_VALUES) {
          if ((i = this.values[v].indexOf(Constants.URL_VALUES[uV])) > -1) {
            this.parsedValues.push(this.values[v].substr(i + Constants.URL_VALUES[uV].length));
          } else {
            this.parsedValues.push(this.values[v]);
          }
        }
      }
    }
  }
}


