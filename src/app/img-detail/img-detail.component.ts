import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Constants } from '../model/constants.model';
import { ImgInfo } from '../model/img-info.model';
import { MainService } from '../main.service';
import { SimilarInfo } from '../model/similar-info.model';

@Component({
  selector: 'app-img-detail',
  templateUrl: './img-detail.component.html',
  styleUrls: ['./img-detail.component.css']
})
export class ImgDetailComponent implements OnInit {

  private info: ImgInfo = new ImgInfo();

  private similarsNames: string[] = [];
  private similars: SimilarInfo[] = [];


  constructor(private service: MainService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.info = new ImgInfo();
      this.info.fileName = params['filename'];
      this.similarsNames = [];
      this.similars = [];
      this.getImg();
      this.getImgInfoAndBindings();
    });
  }

  addBinding(s: string, p: string, o: string): void {
    if (p.localeCompare(Constants.IMGPEDIA_PROP_SIMILAR) === 0) {
      if (s.localeCompare(Constants.IMGPEDIA_URL_RESOURCE + this.info.fileName) === 0) {
        const os = o.split('.');
        if (Constants.IMAGE_FORMATS.indexOf(os[os.length - 1].toLowerCase()) !== -1) {
          this.similarsNames.push(o);
        }
      } else {
        const ss = s.split('.');
        if (Constants.IMAGE_FORMATS.indexOf(ss[ss.length - 1].toLowerCase()) !== -1) {
          this.similarsNames.push(s);
        }
      }
    } else if (p.localeCompare(Constants.IMGPEDIA_PROP_APPEARS_IN) === 0) {
      this.info.appearsIn = o;
    } else if (p.localeCompare(Constants.IMGPEDIA_PROP_ASSOCIATED_WITH) === 0) {
      this.info.associatedWith = o;
    } else if (p.localeCompare(Constants.IMGPEDIA_PROP_HEIGHT) === 0) {
      this.info.height = +o['value'];
    }
  }

  getSimilarUrls(similars: string[]): void {
    for (let i = 0, j = similars.length; i < j; i += Constants.MAX_WIKI_REQUEST) {
        this.service.getSimilarImgInfo(similars.slice(i, i + Constants.MAX_WIKI_REQUEST), window.screen.width / 4)
          .subscribe( res => {
              const pages = res['query']['pages'];
              for (const key in pages) {
                if (+key > 0 && pages.hasOwnProperty(key)) {
                  this.similars.push(new SimilarInfo(
                    pages[key]['title'],
                    pages[key]['imageinfo'][0]['thumburl']
                  ));
                }
              }
            },
          );
      }
  }

  getImg(): void {
    this.service.getImgUrl(this.info.fileName, window.screen.width / 2).subscribe(
      res => {
        const pages = res['query']['pages'];
        for (const key in pages) {
          if (pages.hasOwnProperty(key)) {
            this.info.originalUrl = pages[key]['imageinfo'][0]['url'];
            this.info.thumbUrl = pages[key]['imageinfo'][0]['thumburl'];
          }
        }
      }
    );
  }

  getImgInfoAndBindings(): void {
    this.service.getImgInfo(this.info.fileName).subscribe(
      res => {
        const bindings = res['results']['bindings'];
        for (const key in bindings) {
          if (bindings.hasOwnProperty(key)) {
            this.addBinding(bindings[key]['s']['value'], bindings[key]['p']['value'], bindings[key]['o']['value']);
          }
        }
        this.getSimilarUrls(this.similarsNames);
      }
    );
  }
}
