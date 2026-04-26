export type EvidenceStatus = "documented" | "inProgress" | "supplemental";

export interface LocaleString {
  en: string;
  es?: string;
}

export interface LocaleText {
  en: string;
  es?: string;
}

export interface LocaleBlock {
  en: Array<Record<string, unknown>>;
  es?: Array<Record<string, unknown>>;
}

export interface SanityImage {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  hotspot?: { x: number; y: number };
  crop?: { top: number; bottom: number; left: number; right: number };
}

export interface TopicRef {
  _id: string;
  title: LocaleString;
  slug: { current: string };
}

export interface SeriesRef {
  _id: string;
  title: string;
  slug: { current: string };
}

export interface InvestigationCard {
  _id: string;
  _type: "investigation";
  title: LocaleString;
  abstract?: LocaleText;
  thumbnail?: SanityImage;
  publishedAt: string;
  runtime?: string;
  evidenceStatus: EvidenceStatus;
  slug: { current: string };
  topics?: TopicRef[];
  series?: SeriesRef[];
  documentationSlug?: string;
}

export interface ClipCard {
  _id: string;
  _type: "clip";
  title: LocaleString;
  abstract?: LocaleText;
  thumbnail?: SanityImage;
  youtubeUrl: string;
  publishedAt: string;
  slug: { current: string };
  parentSlug?: string;
  parentTitle?: string;
  topics?: TopicRef[];
}

export interface DocCard {
  _id: string;
  _type: "documentationPackage";
  title: LocaleString;
  slug: { current: string };
  publishedAt: string;
  parentSlug?: string;
  parentTitle?: string;
  parentThumbnail?: SanityImage;
}

export interface SeriesDoc {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
  topicCluster?: string;
  coverImage?: SanityImage;
  investigationCount?: number;
}
