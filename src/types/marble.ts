/**
 * String aliases to document intent without changing runtime behavior.
 * Aligns with guidelines for accurate naming and locale-aware data handling.
 */
export type ISODateString = string; // e.g., 2025-01-31T12:34:56.000Z
export type Slug = string; // kebab-case identifier
export type EmailString = string; // RFC 5322-compatible email
export type UrlString = string; // absolute or protocol-relative URL

export type MarblePost = {
  id: string;
  title: string;
  slug: Slug;
  content: string;
  excerpt?: string;
  /** ISO 8601 string */
  publishedAt: ISODateString;
  /** ISO 8601 string */
  updatedAt: ISODateString;
  author?: MarbleAuthor;
  category?: MarbleCategory;
  tags?: MarbleTag[];
  /** Image URL */
  featuredImage?: UrlString;
  status: "draft" | "published" | "archived";
};

export type MarbleAuthor = {
  id: string;
  name: string;
  email: EmailString;
  bio?: string;
  avatar?: UrlString;
  socialLinks?: {
    twitter?: UrlString;
    linkedin?: UrlString;
    github?: UrlString;
  };
};

export type MarbleCategory = {
  id: string;
  name: string;
  slug: Slug;
  description?: string;
  color?: string;
};

export type MarbleTag = {
  id: string;
  name: string;
  slug: Slug;
  color?: string;
};

export type MarblePostResponse = {
  post: MarblePost;
};

export type MarblePostListResponse = {
  posts: MarblePost[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type MarbleAuthorListResponse = {
  authors: MarbleAuthor[];
};

export type MarbleCategoryListResponse = {
  categories: MarbleCategory[];
};

export type MarbleTagListResponse = {
  tags: MarbleTag[];
};
