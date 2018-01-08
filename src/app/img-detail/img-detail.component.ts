import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Constants } from '../model/constants.model';
import { ImgInfo } from '../model/img-info.model';
import { MainService } from '../main.service';

@Component({
  selector: 'app-img-detail',
  templateUrl: './img-detail.component.html',
  styleUrls: ['./img-detail.component.css']
})
export class ImgDetailComponent implements OnInit {

  private info: ImgInfo = new ImgInfo();

  private similars: string[] = [];
  private similarsUrls: string[] = [];


  constructor(private service: MainService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.info.fileName = params['filename']);
  }

  ngOnInit() {
    this.getImg();
    this.getImgInfoAndBindings();
  }

  addBinding(s: string, p: string, o: string): void {
    if (p.localeCompare('http://imgpedia.dcc.uchile.cl/ontology#similar') === 0) {
      if (s.localeCompare('http://imgpedia.dcc.uchile.cl/resource/' + this.info.fileName) === 0) {
        const os = o.split('.');
        if (Constants.imagesFormats.indexOf(os[os.length - 1].toLowerCase()) !== -1) {
          this.similars.push(o);
        }
      } else {
        const ss = s.split('.');
        if (Constants.imagesFormats.indexOf(ss[ss.length - 1].toLowerCase()) !== -1) {
          this.similars.push(s);
        }
      }
    } else if (p.localeCompare('http://imgpedia.dcc.uchile.cl/ontology#appearsIn') === 0) {
      this.info.appearsIn = o;
    } else if (p.localeCompare('http://imgpedia.dcc.uchile.cl/ontology#associatedWith') === 0) {
      this.info.associatedWith = o;
    } else if (p.localeCompare('http://imgpedia.dcc.uchile.cl/ontology#height') === 0) {
      this.info.height = +o['value'];
    }
  }

  getSimilarUrls(similars: string[]): void {
    for (let i = 0, j = similars.length; i < j; i += Constants.MAX_WIKI_REQUEST) {
        this.service.getSimilarImgInfo(similars.slice(i, i + Constants.MAX_WIKI_REQUEST))
          .subscribe( res => {
              const pages = res['query']['pages'];
              for (const key in pages) {
                if (+key > 0 && pages.hasOwnProperty(key)) {
                  this.similarsUrls.push(pages[key]['imageinfo'][0]['url']);
                }
              }
            },
          );
      }
  }

  getImg(): void {
    this.service.getImgUrl(this.info.fileName).subscribe(
      res => {
        const pages = res['query']['pages'];
        for (const key in pages) {
          if (pages.hasOwnProperty(key)) {
            this.info.originalUrl = pages[key]['imageinfo'][0]['url'];
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
        this.getSimilarUrls(this.similars);
      }
    );
  }
}
