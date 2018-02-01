export class QueryParser {

  static urlParamToText(param: string): string {
    return atob(param.replace(/%2F/g, '/'));
  }

  static textToUrlParam(text: string): string {
    return btoa(text).replace(/\//g, '%2F');
  }

  static textToQuery(text: string): string {
    return text
      .replace(/\n/g, '%0D%0A')
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
}
