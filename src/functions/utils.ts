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

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  
  const day = date.getUTCDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getUTCFullYear();
  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const strMinutes = minutes < 10 ? '0' + minutes : minutes;

  return `${day} ${month} ${year}, ${hours}:${strMinutes} ${ampm}`;
};
