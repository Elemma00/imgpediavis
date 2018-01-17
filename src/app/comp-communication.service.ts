import { Injectable } from '@angular/core';

@Injectable()
export class CompCommunicationService {

  private _sparqlResult: Object;

  constructor() { }

  saveSparqlResult(results: Object): void {
    this._sparqlResult = results;
  }

  get sparqlResult(): Object {
    return this._sparqlResult;
  }

}
