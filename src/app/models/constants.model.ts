import {HttpHeaders} from '@angular/common/http';

export class Constants {
  /** ================================= VALUES ================================================= **/
  /* Maximun number of titles to request in a single Wikimedia API request */
  static MAX_WIKI_REQUEST = 100;
  static QUERY_RESULT_ROW_HEIGHT = '100px';

  static IMG_MISSING_URL = 'assets/img/missing-min.png';
  static IMG_MISSING_BIG_URL = 'assets/img/missing.png';


  /** ================================= WIKIMEDIA =============================================== **/
  static WIKIMEDIA_API_URL = 'https://commons.wikimedia.org/w/api.php';

  /* First replace '%' with a resource name like 'File:example.jpg' or 'File:example1.jpg|File:example2.jpg' */
  /* Second replace '%' with width of the thumb in pixels*/
  static WIKI_API_IMAGE_INFO = Constants.WIKIMEDIA_API_URL + '?action=query&titles=%&prop=imageinfo&&iiprop=url&iiurlwidth=%&format=json&origin=*';


  /** ================================== IMGPEDIA =============================================== **/
  static IMGPEDIA_URL = 'http://imgpedia.dcc.uchile.cl';

  static IMGPEDIA_URL_QUERY = Constants.IMGPEDIA_URL + '/sparql?default-graph-uri=http%3A%2F%2Fimgpedia.dcc.uchile.cl%2Fdataset%23this&format=json&timeout=0&debug=on&query=';
  static IMGPEDIA_URL_QUERY_NO_DEFAULT_DATASET = Constants.IMGPEDIA_URL + '/sparql?format=json&timeout=0&debug=on&query=';

  /* Need to replace 'XXXX' with a resource name like 'example.jpg' */
  static IMGPEDIA_URL_IMAGE_DETAIL = Constants.IMGPEDIA_URL_QUERY + 'SELECT+%3Fsource+%3Fdbp+%3Fwiki+WHERE{%0D%0AVALUES+%3Fsource+{<http%3A%2F%2Fimgpedia.dcc.uchile.cl%2Fresource%2FXXXX>}%0D%0AOPTIONAL{%0D%0A%3Fsource+<http%3A%2F%2Fimgpedia.dcc.uchile.cl%2Fontology%23associatedWith>+%3Fdbp+.%0D%0A%3Fsource+<http%3A%2F%2Fimgpedia.dcc.uchile.cl%2Fontology%23appearsIn>+%3Fwiki+.%0D%0A}%0D%0A}';
  static IMGPEDIA_URL_IMAGE_BINDINGS = Constants.IMGPEDIA_URL_QUERY +  'SELECT+%3Fsource+%3Ftarget+%3Fdesc+%3Fdist+WHERE{%0D%0AVALUES+%3Fsource+{<http%3A%2F%2Fimgpedia.dcc.uchile.cl%2Fresource%2FXXXX>}%0D%0A%3Frel+<http%3A%2F%2Fimgpedia.dcc.uchile.cl%2Fontology%23sourceImage>+%3Fsource+%3B%0D%0A++++<http%3A%2F%2Fimgpedia.dcc.uchile.cl%2Fontology%23targetImage>+%3Ftarget+%3B%0D%0A++++<http%3A%2F%2Fimgpedia.dcc.uchile.cl%2Fontology%23usesDescriptorType>+%3Fdesc+%3B%0D%0A++++<http%3A%2F%2Fimgpedia.dcc.uchile.cl%2Fontology%23distance>+%3Fdist+.%0D%0A}';

  /* Need to replace '%' with a resource name like 'example.jpg' */
  static IMGPEDIA_URL_RESOURCE = Constants.IMGPEDIA_URL + '/resource/';

  static IMGPEDIA_PROP_APPEARS_IN = Constants.IMGPEDIA_URL + '/ontology#appearsIn';
  static IMGPEDIA_PROP_ASSOCIATED_WITH = Constants.IMGPEDIA_URL + '/ontology#associatedWith';
  static IMGPEDIA_PROP_HEIGHT = Constants.IMGPEDIA_URL + '/ontology#height';
  static IMGPEDIA_PROP_SIMILAR = Constants.IMGPEDIA_URL + '/ontology#similar';
  static IMGPEDIA_PROP_WIDTH = Constants.IMGPEDIA_URL + '/ontology#width';

  /* Descriptor types */
  static IMGPEDIA_IMG_DESC_CLD = Constants.IMGPEDIA_URL + '/ontology#CLD';
  static IMGPEDIA_IMG_DESC_GHD = Constants.IMGPEDIA_URL + '/ontology#GHD';
  static IMGPEDIA_IMG_DESC_HOG = Constants.IMGPEDIA_URL + '/ontology#HOG';



  /** =================================== OTHERS ================================================ **/
  /* API header request for CORS requests*/
  static CORS_HEADER: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json; charset=UTF-8'
  });

  /* Image formats available in imgpedia */
  static IMAGE_FORMATS: string[] = ['jpg', 'jpeg', 'png'];

  static URL_VALUES = [Constants.IMGPEDIA_URL + '/ontology#'];


}
