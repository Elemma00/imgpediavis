export class QueryParser {

  static parseQueryToUrl(query: string): string {
    return query
      .replace(/IMGPEDIA/g, 'http://imgpedia.dcc.uchile.cl/')
      .replace(/\n/g, '')
      .replace(/ /g, '+')
      .replace(/\?/g, '%3F')
      .replace(/{/g, '%7B')
      .replace(/}/g, '%7D')
      .replace(/:/g, '%3A')
      .replace(/\//g, '%2F')
      .replace(/#/g, '%23')
      .replace(/;/g, '%3B')
      .replace(/¿/g, '%3B');
  }

  static parseQueryToText(query: string): string {
    return query
      .replace(/\+/g, ' ')
      .replace(/%3F/g, '?')
      .replace(/%7B/g, '{')
      .replace(/%7D/g, '}')
      .replace(/%3A/g, ':')
      .replace(/%2F/g, '/')
      .replace(/%23/g, '#')
      .replace(/%3B/g, ';')
      .replace(/;/g, ';\n')
      .replace(/ \./g, ' .\n');
  }

  static parseTextToUrl(text: string): string {
    return text
      .replace(/http:\/\/imgpedia.dcc.uchile.cl\//g, 'IMGPEDIA')
      .replace(/ /g, '+')
      .replace(/\?/g, '%3F')
      .replace(/{/g, '%7B')
      .replace(/}/g, '%7D')
      .replace(/:/g, '%3A')
      .replace(/\//g, '%2F')
      .replace(/#/g, '%23')
      .replace(/;/g, '¿');
  }
}
