import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {Constants} from './model/constants.model';



@Injectable()
export class MainService {
  constructor(private http: HttpClient) {}

  getImgUrl(fileName: string, thumbWidth: number): Observable<Object> {
    return this.http.get(
      Constants.wikiAPIGetImageInfo.replace('%', 'File:' + fileName).replace('%', '' + thumbWidth),
      {headers: Constants.corsHeaders});
  }

  getImgInfo(fileName: string): Observable<Object> {
    return this.http.get(Constants.sparqlQueryUrl.replace('%',  fileName), {headers: Constants.corsHeaders});
  }

  getSimilarImgInfo(similars: string[], thumbWidht: number): Observable<Object> {
    if (similars.length > Constants.MAX_WIKI_REQUEST) {
        console.error('[MainService:getSimilarImgInfo] Exceeded maximum number of files to request (max: ' +
          Constants.MAX_WIKI_REQUEST + ', requested: ' + similars.length + ')');
        return null;
    }

    let titles = '';
    for (let i = 0; i < similars.length; i++) {
      const ss = similars[i].split('/');
      titles += 'File:' + ss[ss.length - 1] + '|';
    }
    titles = titles.substr(0, titles.length - 1);
    return this.http.get(Constants.wikiAPIGetImageInfo.replace('%', titles).replace('%', '' + thumbWidht),
      {headers: Constants.corsHeaders});
  }
}
