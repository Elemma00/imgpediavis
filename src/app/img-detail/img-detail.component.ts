import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Binding } from '../model/imgpedia-image-binding-query.model';
import { Constants } from '../model/constants.model';
import { ImgDetailInfo } from '../model/img-detail-info.model';
import { MainService } from '../main.service';
import { SimilarInfo } from '../model/similar-info.model';
import { Page } from '../model/wiki-api-image-info.model';


@Component({
  selector: 'app-img-detail',
  templateUrl: './img-detail.component.html',
  styleUrls: ['./img-detail.component.css']
})
export class ImgDetailComponent implements OnInit {

  private detail: ImgDetailInfo = new ImgDetailInfo();

  private similarsNames: string[] = [];

  private similarCLD: { [id: string]: SimilarInfo } = {};
  private similarGHD: { [id: string]: SimilarInfo } = {};
  private similarHOG: { [id: string]: SimilarInfo } = {};


  constructor(private service: MainService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.detail = new ImgDetailInfo();
      this.detail.fileName = params['filename'];
      this.similarsNames = [];
      this.similarCLD = this.similarGHD = this.similarHOG = {};
      this.getImg();
      this.getImgInfoAndBindings();
    });
  }

  keysCLD() {
    return Object.keys(this.similarCLD);
  }

  keysGHD() {
    return Object.keys(this.similarGHD);
  }

  keysHOG() {
    return Object.keys(this.similarHOG);
  }

  addBinding(binding: Binding): void {
    if (binding.desc.value.localeCompare(Constants.IMGPEDIA_IMG_DESC_CLD) === 0) {
      this.similarCLD[binding.target.value] = new SimilarInfo(binding.target.value, +binding.dist.value);
    } else if (binding.desc.value.localeCompare(Constants.IMGPEDIA_IMG_DESC_GHD) === 0) {
      this.similarGHD[binding.target.value] = new SimilarInfo(binding.target.value, +binding.dist.value);
    } else if (binding.desc.value.localeCompare(Constants.IMGPEDIA_IMG_DESC_HOG) === 0) {
      this.similarHOG[binding.target.value] = new SimilarInfo(binding.target.value, +binding.dist.value);
    }
    this.similarsNames.push(binding.target.value);
  }

  addBindingUrl(page: Page): void {
    const title: string = Constants.IMGPEDIA_URL_RESOURCE + page.title.split(':')[1].replace(/ /g, '_');
    if (this.similarCLD.hasOwnProperty(title)) {
      this.similarCLD[title].thumbUrl = page.imageinfo[0].thumburl;
    } else if (this.similarGHD.hasOwnProperty(title)) {
      this.similarGHD[title].thumbUrl = page.imageinfo[0].thumburl;
    } else if (this.similarHOG.hasOwnProperty(title)) {
      this.similarHOG[title].thumbUrl = page.imageinfo[0].thumburl;
    }
  }

  getSimilarUrls(similars: string[]): void {
    for (let i = 0, j = similars.length; i < j; i += Constants.MAX_WIKI_REQUEST) {
        this.service.getSimilarImgInfo(similars.slice(i, i + Constants.MAX_WIKI_REQUEST), window.screen.width / 4)
          .subscribe( res => {
              const pages = res.query.pages;
              for (const key in pages) {
                if (+key > 0 && pages.hasOwnProperty(key)) {
                  this.addBindingUrl(pages[key]);
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

    this.service.getImgInfo(this.detail.fileName).subscribe(
      res => {
        const results = res.results.bindings;
        for (const key in results) {
          if (results.hasOwnProperty(key)) {
            if (this.detail.associatedWith.indexOf(results[key].dbp.value) === -1) {
              this.detail.associatedWith.push(results[key].dbp.value);
            }
            if (this.detail.appearsIn.indexOf(results[key].wiki.value) === -1) {
              this.detail.appearsIn.push(results[key].wiki.value);
            }
          }
        }
        console.log(this.detail);
      }
    );
  }

  getImgInfoAndBindings(): void {
    this.service.getImgBindings(this.detail.fileName).subscribe(
      res => {
        const bindings = res.results.bindings;
        if (bindings.length > 0) {

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
