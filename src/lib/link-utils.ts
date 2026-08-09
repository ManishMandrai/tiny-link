export const CODE_REGEX = /^[A-Za-z0-9]{3,8}$/;

export function validateUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

export function generateCode(): string {
  // simple random 6-char code [a-z0-9]
  return Math.random().toString(36).slice(2, 8);
}
