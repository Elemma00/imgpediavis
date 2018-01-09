export class SimilarInfo {

  public imgpediaUrl: string;

  constructor(
    public fileName: string,
    public wikiThumUrl: string
  ) {
    this.fileName = this.fileName.split(':')[1].replace(/ /g, '_');
  }
}
