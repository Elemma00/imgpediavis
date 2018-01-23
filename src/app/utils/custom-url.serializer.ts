import {UrlSerializer, UrlTree, DefaultUrlSerializer} from '@angular/router';

export class CustomUrlSerializer implements UrlSerializer {
  parse(url: any): UrlTree {
    const dus = new DefaultUrlSerializer();
    return dus.parse(url);
  }

  serialize(tree: UrlTree): any {
    const dus = new DefaultUrlSerializer(),
      path = dus.serialize(tree);
    const firstSemicolon: number = path.indexOf(';');
    if (firstSemicolon > -1) {
      return path.substr(0, firstSemicolon + 1) + path.substr(firstSemicolon + 1)
        .replace(/%2B/g, '+')
        .replace(/%25/g, '%')
        .replace(/\(/g, '%28')
        .replace(/\)/g, '%29')
        .replace(/'/g, '%27');
    }
    return path;
  }
}
