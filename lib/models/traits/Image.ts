import { Entity } from "./Entity";
import { EXT, MIME, CMS_RELATIVE_URL } from "../aliases";
import { Dimensional } from "./Dimensional";

interface CoreImage {
  ext?: EXT;
  hash?: string;
  mime?: MIME;
  name?: string;
  url?: CMS_RELATIVE_URL;
}

interface ImageFormat extends Dimensional, CoreImage {}

export interface Image extends Entity, Dimensional, CoreImage {
  alternativeText?: string;
  caption?: string;
  // hiding unknown things
  // previewUrl?: string;
  // provider?: string;
  // provider_metadata?: any;
  formats?: {
    [_: string]: ImageFormat;
  };
}
