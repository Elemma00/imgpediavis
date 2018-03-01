export class QueryParser {

  static urlParamToText(param: string): string {
    return atob(param.replace(/_/g, '/'));
  }

  static textToUrlParam(text: string): string {
    let d, i: number;
    const param: string = btoa(text).replace(/\//g, '_');

    /* Here we handle the restriction of 255 chars for filesystem's filenames that some server (like Apache) has
    * The extra '/'s are removed by the [CustomUrlSerializer] */
    if ((d = Math.floor(param.length / 250)) > 0) {
      let paramSlash: string = param.substr(0, 249);
      for (i = 1; i <= d; i++) {
        paramSlash = paramSlash + '/' + param.substr(250 * i - 1, 250);
      }
      return paramSlash;
    }
    return param;
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
      .replace(/¿/g, '%3B')
      .replace(/\//g, '%28')
      .replace(/\\/g, '%29')
      .replace(/&/g, '%26')
      .replace(/=/g, '%3D');
  }
}
