import type {
  MarbleAuthorListResponse,
  MarbleCategoryListResponse,
  MarblePostListResponse,
  MarblePostResponse,
  MarbleTagListResponse,
} from "@/types/marble";

const url = process.env.MARBLE_API_URL;
const key = process.env.MARBLE_WORKSPACE_KEY;

export async function getPosts() {
  try {
    const raw = await fetch(`${url}/${key}/posts`, {
      cache: "force-cache",
      next: { revalidate: 3600 },
    });
    const data: MarblePostListResponse = await raw.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getTags() {
  try {
    const raw = await fetch(`${url}/${key}/tags`, {
      cache: "force-cache",
      next: { revalidate: 3600 },
    });
    const data: MarbleTagListResponse = await raw.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getSinglePost(slug: string) {
  try {
    const raw = await fetch(`${url}/${key}/posts/${slug}`, {
      cache: "force-cache",
      next: { revalidate: 3600 },
    });
    const data: MarblePostResponse = await raw.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getCategories() {
  try {
    const raw = await fetch(`${url}/${key}/categories`, {
      cache: "force-cache",
      next: { revalidate: 3600 },
    });
    const data: MarbleCategoryListResponse = await raw.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getAuthors() {
  try {
    const raw = await fetch(`${url}/${key}/authors`, {
      cache: "force-cache",
      next: { revalidate: 3600 },
    });
    const data: MarbleAuthorListResponse = await raw.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
