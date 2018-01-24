import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Binding } from '../../models/imgpedia-image-binding-query.model';
import { Constants } from '../../models/constants.model';
import { ImgDetailInfo } from '../../models/img-detail-info.model';
import { MainService } from '../../services/main.service';
import { SimilarInfo } from '../../models/similar-info.model';
import { Page } from '../../models/wiki-api-image-info.model';


@Component({
  selector: 'app-img-detail',
  templateUrl: './img-detail.component.html',
  styleUrls: ['./img-detail.component.css']
})
export class ImgDetailComponent implements OnInit {

  private detail: ImgDetailInfo = new ImgDetailInfo();

  private similarsNames: string[] = [];

  private descriptors: {[id: string]: SimilarInfo[]} = {};

  constructor(private service: MainService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.detail = new ImgDetailInfo();
      this.detail.fileName = params['filename'];
      this.similarsNames = [];
      this.descriptors = {};
      this.getImg();
      this.getImgInfoAndBindings();
    });
  }

  getDescriptors(): string[] {
    return Object.keys(this.descriptors);
  }

  formatDescriptorName(descUrl: string): string {
    const s = descUrl.split('#');
    return s[1].toUpperCase();
  }

  addBinding(binding: Binding): void {
    if (this.getDescriptors().indexOf(binding.desc.value) === -1) {
      this.descriptors[binding.desc.value] = [];
    }
    this.descriptors[binding.desc.value].push(new SimilarInfo(binding.target.value, +binding.dist.value));
    this.similarsNames.push(binding.target.value);
  }

  addBindingUrl(page: Page, key: number): void {
    let i: number;
    const title: string = Constants.IMGPEDIA_URL_RESOURCE + page.title.split(':')[1].replace(/ /g, '_');
    for (const desc in this.descriptors) {
      if (this.descriptors.hasOwnProperty(desc)) {
        for (i = 0; i < this.descriptors[desc].length; i++) {
          if (this.descriptors[desc][i].fileNameUrl === title) {
            if (key >= 0) {
              this.descriptors[desc][i].thumbUrl = page.imageinfo[0].thumburl;
            } else {
              this.descriptors[desc][i].thumbUrl = Constants.IMG_MISSING_URL;
            }
          }
        }
      }
    }
  }

  getSimilarUrls(similars: string[]): void {
    for (let i = 0, j = similars.length; i < j; i += Constants.MAX_WIKI_REQUEST) {
        this.service.getSimilarImgInfo(similars.slice(i, i + Constants.MAX_WIKI_REQUEST), window.screen.width / 4)
          .subscribe( res => {
              const pages = res.query.pages;
              for (const key in pages) {
                if (pages.hasOwnProperty(key)) {
                  this.addBindingUrl(pages[key], +key);
                }
              }
              this.sortSimilarsByDistance();
            },
          );
      }
  }

  sortSimilarsByDistance(): void {
    const compareFunction = function(a: SimilarInfo, b: SimilarInfo): number {
      return a.distance - b.distance;
    };
    for (const key in this.descriptors) {
      if (this.descriptors.hasOwnProperty(key)) {
        this.descriptors[key].sort(compareFunction);
      }
    }
  }

  getImg(): void {
    this.service.getImgUrl(this.detail.fileName, window.screen.width / 2).subscribe(
      res => {
        const pages = res.query.pages;
        for (const key in pages) {
          if (pages.hasOwnProperty(key)) {
            this.detail.originalUrl = pages[key].imageinfo[0].url;
            if (pages[key].imageinfo[0].thumburl) {
              this.detail.thumbUrl = pages[key].imageinfo[0].thumburl;
            } else {
              this.detail.thumbUrl = Constants.IMG_MISSING_URL;
            }
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
