export interface MarblePost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  publishedAt: string;
  updatedAt: string;
  author?: MarbleAuthor;
  category?: MarbleCategory;
  tags?: MarbleTag[];
  featuredImage?: string;
  status: "draft" | "published" | "archived";
}

export interface MarbleAuthor {
  id: string;
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

export interface MarbleCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
}

export interface MarbleTag {
  id: string;
  name: string;
  slug: string;
  color?: string;
}

export interface MarblePostResponse {
  post: MarblePost;
}

export interface MarblePostListResponse {
  posts: MarblePost[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface MarbleAuthorListResponse {
  authors: MarbleAuthor[];
}

export interface MarbleCategoryListResponse {
  categories: MarbleCategory[];
}

export interface MarbleTagListResponse {
  tags: MarbleTag[];
}
