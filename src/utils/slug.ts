export const SLUG_MAX_LENGTH = 63;

/** Lowercase ASCII slug (Vietnamese diacritics removed). Keeps a trailing dash so typing "an-" still works. */
export function toSlugInput(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'd')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+/, '')
    .slice(0, SLUG_MAX_LENGTH);
}

export function toSlug(text: string): string {
  return toSlugInput(text).replace(/-+$/, '');
}

/** Given name of a Vietnamese full name: the last word ("Đậu Trường" gives "Trường"). */
export function givenName(fullName: string): string {
  const words = fullName.trim().split(/\s+/).filter(Boolean);
  return words[words.length - 1] ?? '';
}

/** Default link for a couple: given name of each person, e.g. "Nguyễn Thị Huyền" + "Đậu Trường" gives "huyen-truong". */
export function slugFromNames(name1: string, name2: string): string {
  return toSlug(`${givenName(name1)} ${givenName(name2)}`);
}
