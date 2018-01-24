import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {Constants} from '../models/constants.model';
import {ImgpediaBindingQueryResult} from '../models/imgpedia-image-binding-query.model';
import {ImgpediaDetailQueryResult} from '../models/imgpedia-image-detail-query.model';
import {WikiApiConsult} from '../models/wiki-api-image-info.model';



@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {}

  getImgUrl(fileName: string, thumbWidth: number): Observable<WikiApiConsult> {
    return this.http.get<WikiApiConsult>(
      Constants.WIKI_API_IMAGE_INFO.replace('%', 'File:' + fileName).replace('%', '' + thumbWidth),
      {headers: Constants.CORS_HEADER});
  }

  getImgInfo(fileName: string) : Observable<ImgpediaDetailQueryResult> {
    return this.http.get<ImgpediaDetailQueryResult>(Constants.IMGPEDIA_URL_IMAGE_DETAIL.replace('XXXX', fileName), {headers: Constants.CORS_HEADER});
  }

  getImgBindings(fileName: string): Observable<ImgpediaBindingQueryResult> {
    return this.http.get<ImgpediaBindingQueryResult>(Constants.IMGPEDIA_URL_IMAGE_BINDINGS.replace('XXXX',  fileName), {headers: Constants.CORS_HEADER});
  }

  getSimilarImgInfo(similars: string[], thumbWidht: number): Observable<WikiApiConsult> {
    if (similars.length > Constants.MAX_WIKI_REQUEST) {
        console.error('[HttpService:getSimilarImgInfo] Exceeded maximum number of files to request (max: ' +
          Constants.MAX_WIKI_REQUEST + ', requested: ' + similars.length + ')');
        return null;
    }

    let titles = '';
    for (let i = 0; i < similars.length; i++) {
      const ss = similars[i].split('/');
      titles += 'File:' + ss[ss.length - 1] + '|';
    }
    titles = titles.substr(0, titles.length - 1);
    return this.http.get<WikiApiConsult>(Constants.WIKI_API_IMAGE_INFO.replace('%', titles).replace('%', '' + thumbWidht),
      {headers: Constants.CORS_HEADER});
  }

  getImgpediaSparqlQuery(query: string): Observable<Object> {
    const cleanQuery = query
      .replace(/\n/g, '')
      .replace(/ /g, '+')
      .replace(/\?/g, '%3F')
      .replace(/{/g, '%7B')
      .replace(/}/g, '%7D')
      .replace(/:/g, '%3A')
      .replace(/\//g, '%2F')
      .replace(/#/g, '%23')
      .replace(/;/g, '%3B');
    return this.http.get(Constants.IMGPEDIA_URL_QUERY + query, {headers: Constants.CORS_HEADER});
  }
}
