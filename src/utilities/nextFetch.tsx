const nextFetch = async <T = any>(
  slug: string,
  ...opt: RequestInit[]
): Promise<T | undefined> => {
  const fetchOptions: RequestInit = {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    ...Object.assign({}, ...opt),
  };

  // Normalize slashes in URL
  const baseUrl = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");
  const cleanSlug = slug.startsWith("/") ? slug : `/${slug}`;
  
  // Add a cache-busting timestamp to bypass Hostinger/LiteSpeed API cache
  const separator = cleanSlug.includes('?') ? '&' : '?';
  const url = `${baseUrl}${cleanSlug}${separator}t=${Date.now()}`;

  try {
    const res = await fetch(url, fetchOptions);

    if (!res.ok) {
      if (process.env.NODE_ENV === "development") {
        console.error(`nextFetch failed [${res.status}]: ${url}`);
      }
      return undefined;
    }

    const data = await res.json();
    return data as T;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(`nextFetch error for ${url}:`, error);
    }
    return undefined;
  }
};

export default nextFetch;

