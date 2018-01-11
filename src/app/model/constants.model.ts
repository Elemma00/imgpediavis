import {HttpHeaders} from '@angular/common/http';

export class Constants {
  /** ================================= VALUES ================================================= **/
  /* Maximun number of titles to request in a single Wikimedia API request */
  static MAX_WIKI_REQUEST = 100;


  /** ================================= WIKIMEDIA =============================================== **/
  static WIKIMEDIA_API_URL = 'https://commons.wikimedia.org/w/api.php';

  /* First replace '%' with a resource name like 'File:example.jpg' or 'File:example1.jpg|File:example2.jpg' */
  /* Second replace '%' with width of the thumb in pixels*/
  static WIKI_API_IMAGE_INFO = Constants.WIKIMEDIA_API_URL + '?action=query&titles=%&prop=imageinfo&&iiprop=url&iiurlwidth=%&format=json';


  /** ================================== IMGPEDIA =============================================== **/
  static IMGPEDIA_URL = 'http://imgpedia.dcc.uchile.cl';

  /* Need to replace '%' with a resource name like 'example.jpg' */
  static IMGPEDIA_URL_DETAIL = Constants.IMGPEDIA_URL + '/sparql?query=describe<http://imgpedia.dcc.uchile.cl/resource/%>&format=json';
  static IMGPEDIA_URL_RESOURCE = Constants.IMGPEDIA_URL + '/resource/';

  static IMGPEDIA_PROP_APPEARS_IN = Constants.IMGPEDIA_URL + '/ontology#appearsIn';
  static IMGPEDIA_PROP_ASSOCIATED_WITH = Constants.IMGPEDIA_URL + '/ontology#associatedWith';
  static IMGPEDIA_PROP_HEIGHT = Constants.IMGPEDIA_URL + '/ontology#height';
  static IMGPEDIA_PROP_SIMILAR = Constants.IMGPEDIA_URL + '/ontology#similar';
  static IMGPEDIA_PROP_WIDTH = Constants.IMGPEDIA_URL + '/ontology#width';


  /** =================================== OTHERS ================================================ **/
  /* API header request for CORS requests*/
  static CORS_HEADER: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': Constants.IMGPEDIA_URL
  });

  /* Image formats available in imgpedia */
  static IMAGE_FORMATS: string[] = ['jpg', 'jpeg', 'png'];


}
