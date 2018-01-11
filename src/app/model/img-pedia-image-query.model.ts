export interface ImgpediaRegistry {
  type: string;
  value: string;
}

export interface ImgpediaRegistryWithDatatype extends ImgpediaRegistry {
  datatype: string;
}

export interface Binding {
  source: ImgpediaRegistry;
  dbp?: ImgpediaRegistry;
  wiki?: ImgpediaRegistry;
  target: ImgpediaRegistry;
  desc: ImgpediaRegistry;
  dist: ImgpediaRegistryWithDatatype;
}

export interface Results {
  bindings: Binding[];
}

export interface ImgPediaConsult {
  results: Results;
}
