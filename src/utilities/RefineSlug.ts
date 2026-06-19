const RefineSlug = (slug: string[]): string | null => {
  let combinedString: string;
  if (slug.length === 0) {
    return null;
  } else {
    combinedString = slug.join("/");
  }
  return combinedString;
};

export default RefineSlug;
