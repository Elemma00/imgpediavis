import {HttpHeaders} from '@angular/common/http';

export class Constants {
  /** NUMBERS **/
  /* Maximun number of titles to request in a single Wikimedia API request */
  static MAX_WIKI_REQUEST = 100;

  /** URLs **/
  /* Current IMGpedia root URL */
  static imgpediaUrl = 'imgpedia.dcc.uchile.cl';

  /** Internal requests **/
  /* Need to replace '%' with a resource name like 'example.jpg' */
  static sparqlQueryUrl =
    'http://imgpedia.dcc.uchile.cl/sparql?query=describe<http://imgpedia.dcc.uchile.cl/resource/%>&format=json';

  /** APIs **/
  /* Need to replace '%' with a resource name like 'File:example.jpg' or 'File:example1.jpg|File:example2.jpg' */
  static wikiAPIGetImageInfo =
    'https://commons.wikimedia.org/w/api.php?action=query&titles=%&prop=imageinfo&&iiprop=url&format=json';

  /** Others **/
  /* Wikimedia API header request */
  static corsHeaders: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': Constants.imgpediaUrl
  });

  /* Image formats available in imgpedia */
  static imagesFormats: string[] = ['jpg', 'jpeg', 'png'];

}
