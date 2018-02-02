import {UrlSerializer, UrlTree, DefaultUrlSerializer} from '@angular/router';

export class CustomUrlSerializer implements UrlSerializer {

  private _defaultUrlSerializer: DefaultUrlSerializer = new DefaultUrlSerializer();

  parse(url: any): UrlTree {
    /* Here we handle the extra slash that [QueryParser.textToUrlParam] adds */
    const isQuery = url.indexOf('/query/');
    if (isQuery === 0) {
      url = '/query/' + url.substr(7).replace(/\//g, '');
    }
    url = url.replace(/\(/g, '%28').replace(/\)/g, '%29');
    return this._defaultUrlSerializer.parse(url);
  }

  serialize(tree: UrlTree): any {
    return this._defaultUrlSerializer.serialize(tree).replace(/%28/g, '(').replace(/%29/g, ')');
  }
}
