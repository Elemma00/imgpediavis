import { Injectable } from '@angular/core';

@Injectable()
export class CompCommunicationService {

  private _sparqlResult: Object;
  private _sparqlHeaders: string[];

  constructor() { }

  saveSparqlHeader(headers: string[]): void {
    this._sparqlHeaders = headers;
  }

  saveSparqlResult(results: Object): void {
    this._sparqlResult = results;
  }

  get sparqlResult(): Object {
    return this._sparqlResult;
  }

  get sparqlHeaders(): string[] {
    return this._sparqlHeaders;
  }

}
