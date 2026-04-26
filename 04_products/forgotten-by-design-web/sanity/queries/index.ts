// ─── Investigation queries ─────────────────────────────────────────────────

export const FEATURED_INVESTIGATION_QUERY = `
  *[_type == "investigation" && featured == true] | order(publishedAt desc) [0] {
    _id, title, abstract, youtubeUrl, thumbnail, publishedAt, runtime,
    evidenceStatus, slug,
    "documentationSlug": documentationPage->slug.current,
    topics[]->{ _id, title, slug },
    series[]->{ _id, title, slug },
  }
`;

export const LATEST_INVESTIGATIONS_QUERY = `
  *[_type == "investigation" && format == "long-form"] | order(publishedAt desc) [0...6] {
    _id, title, abstract, thumbnail, publishedAt, runtime,
    evidenceStatus, slug,
    topics[]->{ _id, title, slug },
    series[]->{ _id, title, slug },
    "documentationSlug": documentationPage->slug.current,
  }
`;

export const INVESTIGATION_SLUGS_QUERY = `
  *[_type == "investigation"] { "slug": slug.current }
`;

export const INVESTIGATION_BY_SLUG_QUERY = `
  *[_type == "investigation" && slug.current == $slug][0] {
    _id, title, abstract, youtubeUrl, thumbnail, publishedAt, runtime,
    evidenceStatus, format, claims, transcript,
    slug,
    topics[]->{ _id, title, slug },
    series[]->{ _id, title, slug },
    evidencePreview,
    "documentationPage": documentationPage->{ _id, slug, title },
    relatedInvestigations[]->{ _id, title, abstract, thumbnail, slug, evidenceStatus, publishedAt },
    relatedClips[]->{ _id, title, abstract, thumbnail, slug, youtubeUrl, publishedAt },
    seoTitle, seoDescription, shareImage,
  }
`;

// ─── Clip queries ─────────────────────────────────────────────────────────

export const RECENT_CLIPS_QUERY = `
  *[_type == "clip"] | order(publishedAt desc) [0...6] {
    _id, title, abstract, thumbnail, youtubeUrl, publishedAt, slug,
    "parentSlug": parentInvestigation->slug.current,
    "parentTitle": parentInvestigation->title.en,
    topics[]->{ _id, title, slug },
  }
`;

// ─── Documentation queries ─────────────────────────────────────────────────

export const FEATURED_DOCS_QUERY = `
  *[_type == "documentationPackage"] | order(publishedAt desc) [0...3] {
    _id, title, slug, publishedAt,
    "parentSlug": parentInvestigation->slug.current,
    "parentTitle": parentInvestigation->title.en,
    "parentThumbnail": parentInvestigation->thumbnail,
  }
`;

export const DOC_SLUGS_QUERY = `
  *[_type == "documentationPackage"] { "slug": slug.current }
`;

export const DOC_BY_SLUG_QUERY = `
  *[_type == "documentationPackage" && slug.current == $slug][0] {
    _id, title, slug, publishedAt,
    claims, screenshots, lacunaNote,
    primarySources, supportingSources, contextualSources,
    "parentInvestigation": parentInvestigation->{ _id, title, slug, thumbnail },
    seoTitle, seoDescription,
  }
`;

// ─── Archive queries ───────────────────────────────────────────────────────

export const ARCHIVE_ALL_QUERY = `
  {
    "investigations": *[_type == "investigation"] | order(publishedAt desc) {
      _id, _type, title, abstract, thumbnail, publishedAt, runtime,
      evidenceStatus, slug,
      topics[]->{ _id, title, slug },
      series[]->{ _id, title, slug },
    },
    "clips": *[_type == "clip"] | order(publishedAt desc) {
      _id, _type, title, abstract, thumbnail, publishedAt, slug,
      topics[]->{ _id, title, slug },
    },
    "docs": *[_type == "documentationPackage"] | order(publishedAt desc) {
      _id, _type, title, publishedAt, slug,
      "parentSlug": parentInvestigation->slug.current,
    }
  }
`;

// ─── Series queries ─────────────────────────────────────────────────────────

export const ALL_SERIES_QUERY = `
  *[_type == "series"] | order(title asc) {
    _id, title, slug, description, topicCluster, coverImage,
    "investigationCount": count(*[_type == "investigation" && references(^._id)])
  }
`;

export const SERIES_BY_SLUG_QUERY = `
  *[_type == "series" && slug.current == $slug][0] {
    _id, title, slug, description, topicCluster, coverImage,
    "investigations": *[_type == "investigation" && references(^._id)] | order(publishedAt desc) {
      _id, title, abstract, thumbnail, slug, evidenceStatus, publishedAt, runtime,
    }
  }
`;

// ─── Taxonomy ──────────────────────────────────────────────────────────────

export const ALL_TOPICS_QUERY = `
  *[_type == "topic"] | order(title asc) { _id, title, slug }
`;
