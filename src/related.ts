// Pages that other pages link to with descriptive anchor text (FAQ answers, "Related pages").
export type RelatedPage = 'printer' | 'gallery' | 'ways' | 'warranty' | 'hygiene' | 'bookDemo';
export const relatedPaths: Record<RelatedPage, string> = {
  printer: '/printer/',
  gallery: '/gallery/',
  ways: '/ways-to-own/',
  warranty: '/warranty/',
  hygiene: '/hygiene/',
  bookDemo: '/book-a-demo/',
};
