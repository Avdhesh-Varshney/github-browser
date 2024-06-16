export function capitalizeFirstLetter(name: string) {
  return name.replace(/\b\w/g, function (char) {
    return char.toUpperCase();
  });
}

export function trimName(name: string) {
  let trimedName = name.replace(/<em>|<\/em>/gi, ' ')
    .replace(/[^a-zA-Z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return capitalizeFirstLetter(trimedName);
}
