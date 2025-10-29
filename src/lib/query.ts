import type {
  MarbleAuthorListResponse,
  MarbleCategoryListResponse,
  MarblePostListResponse,
  MarblePostResponse,
  MarbleTagListResponse,
} from "@/types/marble";

const url = process.env.MARBLE_API_URL;
const key = process.env.MARBLE_WORKSPACE_KEY;

const FETCH_TIMEOUT_MS = 10_000;

function ensureEnv(value: string | undefined, name: string): string {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function reportError(_message: string, _error: unknown) {
  // Intentionally no-op to avoid console usage in production builds
}

async function fetchFromMarble<T>(
  path: string,
  init?: RequestInit & { next?: { revalidate?: number } }
): Promise<T> {
  const baseUrl = ensureEnv(url, "MARBLE_API_URL");
  const workspaceKey = ensureEnv(key, "MARBLE_WORKSPACE_KEY");

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(`${baseUrl}/${workspaceKey}${path}`, {
      cache: "force-cache",
      next: { revalidate: 3600, ...(init?.next ?? {}) },
      headers: { Accept: "application/json" },
      signal: controller.signal,
      ...init,
    });

    if (!response.ok) {
      throw new Error(
        `Request failed: ${response.status} ${response.statusText}`
      );
    }

    const data = (await response.json()) as T;
    return data;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function getPosts() {
  try {
    const data = await fetchFromMarble<MarblePostListResponse>("/posts");
    return data;
  } catch (error) {
    reportError("Failed to fetch posts", error);
  }
}

export async function getTags() {
  try {
    const data = await fetchFromMarble<MarbleTagListResponse>("/tags");
    return data;
  } catch (error) {
    reportError("Failed to fetch tags", error);
  }
}

export async function getSinglePost(slug: string) {
  try {
    const data = await fetchFromMarble<MarblePostResponse>(`/posts/${slug}`);
    return data;
  } catch (error) {
    reportError("Failed to fetch single post", error);
  }
}

export async function getCategories() {
  try {
    const data =
      await fetchFromMarble<MarbleCategoryListResponse>("/categories");
    return data;
  } catch (error) {
    reportError("Failed to fetch categories", error);
  }
}

export async function getAuthors() {
  try {
    const data = await fetchFromMarble<MarbleAuthorListResponse>("/authors");
    return data;
  } catch (error) {
    reportError("Failed to fetch authors", error);
  }
}
