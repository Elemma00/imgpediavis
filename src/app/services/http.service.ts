import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/share';

import {Constants} from '../models/constants.model';
import {ImgpediaBindingQueryResult} from '../models/imgpedia-image-binding-query.model';
import {ImgpediaDetailQueryResult} from '../models/imgpedia-image-detail-query.model';
import {WikiApiConsult} from '../models/wiki-api-image-info.model';
import {QueryParser} from '../utils/query-parser';



@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {}

  getImgUrl(fileName: string, thumbWidth: number): Observable<WikiApiConsult> {
    return this.http.get<WikiApiConsult>(
      Constants.WIKI_API_IMAGE_INFO.replace('%', 'File:' + fileName).replace('iiurlwidth=%', 'iiurlwidth=' + thumbWidth),
      {headers: Constants.CORS_HEADER});
  }

  getImgInfo(fileName: string): Observable<ImgpediaDetailQueryResult> {
    return this.http.get<ImgpediaDetailQueryResult>(Constants.IMGPEDIA_URL_IMAGE_DETAIL.replace('XXXX', fileName), {headers: Constants.CORS_HEADER});
  }

  getImgBindings(fileName: string): Observable<ImgpediaBindingQueryResult> {
    return this.http.get<ImgpediaBindingQueryResult>(Constants.IMGPEDIA_URL_IMAGE_BINDINGS.replace('XXXX',  fileName), {headers: Constants.CORS_HEADER});
  }

  getSimilarImgInfo(similars: string[], thumbWidht: number): Observable<WikiApiConsult> {
    let titles = '';
    for (let i = 0; i < similars.length; i++) {
      const ss = similars[i].split('/');
      titles += 'File:' + ss[ss.length - 1].replace(/&/g, '%26') + '|';
    }
    titles = titles.substr(0, titles.length - 1);
    return this.http.get<WikiApiConsult>(Constants.WIKI_API_IMAGE_INFO.replace('%', titles).replace('iiurlwidth=%', 'iiurlwidth=' + thumbWidht),
      {headers: Constants.CORS_HEADER});
  }

  getImgpediaSparqlQuery(text: string): Observable<Object> {
    const query = QueryParser.textToQuery(text);
    return this.http.get(Constants.IMGPEDIA_URL_QUERY + query, {headers: Constants.CORS_HEADER});
  }
}
