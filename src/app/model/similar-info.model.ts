export class SimilarInfo {
  private _fileName: string;
  private _thumbUrl: string;

  constructor(fileName: string, thumbUrl) {
    this._fileName = fileName.split(':')[1].replace(/ /g, '_');
    this._thumbUrl = thumbUrl;
  }

  get fileName(): string {
    return this._fileName;
  }

  get thumbUrl(): string {
    return this._thumbUrl;
  }
}

