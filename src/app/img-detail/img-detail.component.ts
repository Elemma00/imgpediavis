import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Constants } from '../model/constants.model';
import { ImgDetailInfo } from '../model/img-detail-info.model';
import { MainService } from '../main.service';
import { SimilarInfo } from '../model/similar-info.model';
import { Binding } from '../model/img-pedia-image-query.model';


@Component({
  selector: 'app-img-detail',
  templateUrl: './img-detail.component.html',
  styleUrls: ['./img-detail.component.css']
})
export class ImgDetailComponent implements OnInit {

  private detail: ImgDetailInfo = new ImgDetailInfo();

  private similarsNames: string[] = [];
  private similars: SimilarInfo[] = [];


  constructor(private service: MainService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.detail = new ImgDetailInfo();
      this.detail.fileName = params['filename'];
      this.similarsNames = [];
      this.similars = [];
      this.getImg();
      this.getImgInfoAndBindings();
    });
  }

  addBinding(binding: Binding): void {
    this.similarsNames.push(binding.target.value);
  }

  getSimilarUrls(similars: string[]): void {
    for (let i = 0, j = similars.length; i < j; i += Constants.MAX_WIKI_REQUEST) {
        this.service.getSimilarImgInfo(similars.slice(i, i + Constants.MAX_WIKI_REQUEST), window.screen.width / 4)
          .subscribe( res => {
              const pages = res.query.pages;
              for (const key in pages) {
                if (+key > 0 && pages.hasOwnProperty(key)) {
                  this.similars.push(
                    new SimilarInfo(pages[key].title, pages[key].imageinfo[0].thumburl));
                }
              }
            },
          );
      }
  }

  getImg(): void {
    this.service.getImgUrl(this.detail.fileName, window.screen.width / 2).subscribe(
      res => {
        const pages = res.query.pages;
        for (const key in pages) {
          if (pages.hasOwnProperty(key)) {
            this.detail.originalUrl = pages[key].imageinfo[0].url;
            this.detail.thumbUrl = pages[key].imageinfo[0].thumburl;
          }
        }
      }
    );
  }

  getImgInfoAndBindings(): void {
    this.service.getImgInfo(this.detail.fileName).subscribe(
      res => {
        const bindings = res.results.bindings;
        if (bindings.length > 0) {

          if (bindings[0].dbp) { this.detail.associatedWith = bindings[0].dbp.value; }
          if (bindings[0].wiki) { this.detail.appearsIn = bindings[0].wiki.value; }

          for (const key in bindings) {
            if (bindings.hasOwnProperty (key)) {
              this.addBinding(bindings[key]);
            }
          }
          this.getSimilarUrls(this.similarsNames);
        }
      }
    );
  }
}
