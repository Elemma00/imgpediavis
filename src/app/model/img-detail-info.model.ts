export class ImgDetailInfo {
  fileName: string;
  originalUrl: string;
  thumbUrl: string;
  associatedWith: string[];
  appearsIn: string[];
  height: number;

  constructor() {
    this.associatedWith = [];
    this.appearsIn = [];
  }
}
