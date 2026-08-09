import { validateUrl, generateCode, CODE_REGEX } from "./link-utils";

describe("validateUrl", () => {
  it("accepts valid http URLs", () => {
    expect(validateUrl("http://example.com")).toBe(true);
  });

  it("accepts valid https URLs", () => {
    expect(validateUrl("https://example.com/path?query=1")).toBe(true);
  });

  it("rejects malformed URLs", () => {
    expect(validateUrl("not-a-url")).toBe(false);
  });

  it("rejects non-http(s) protocols", () => {
    expect(validateUrl("ftp://example.com")).toBe(false);
    expect(validateUrl("javascript:alert(1)")).toBe(false);
  });

  it("rejects empty string", () => {
    expect(validateUrl("")).toBe(false);
  });
});

describe("generateCode", () => {
  it("generates a 6-character alphanumeric code", () => {
    const code = generateCode();
    expect(code).toHaveLength(6);
    expect(CODE_REGEX.test(code)).toBe(true);
  });

  it("generates different codes across calls (probabilistic)", () => {
    const codes = new Set(Array.from({ length: 20 }, () => generateCode()));
    expect(codes.size).toBeGreaterThan(1);
  });
});

describe("CODE_REGEX", () => {
  it("accepts 3-8 char alphanumeric codes", () => {
    expect(CODE_REGEX.test("abc")).toBe(true);
    expect(CODE_REGEX.test("abcd1234")).toBe(true);
  });

  it("rejects codes shorter than 3 or longer than 8 chars", () => {
    expect(CODE_REGEX.test("ab")).toBe(false);
    expect(CODE_REGEX.test("abcd12345")).toBe(false);
  });

  it("rejects codes with special characters", () => {
    expect(CODE_REGEX.test("abc-123")).toBe(false);
    expect(CODE_REGEX.test("abc_123")).toBe(false);
  });
});
