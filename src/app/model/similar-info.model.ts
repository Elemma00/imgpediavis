export class SimilarInfo {

  private _fileName: string;
  private _thumbUrl: string;
  private _distance: number;

  constructor(fileName: string, distance: number) {
    this._fileName = fileName.split(':')[1].replace(/ /g, '_');
    this._distance = distance;
  }

  get distance(): number {
    return this._distance;
  }

  get fileName(): string {
    return this._fileName;
  }

  get thumbUrl(): string {
    return this._thumbUrl;
  }

  set thumbUrl(value: string) {
    this._thumbUrl = value;
  }
}

