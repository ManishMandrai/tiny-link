jest.mock("@/lib/prisma", () => ({
  prisma: {
    link: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  },
}));

import { GET } from "./route";
import { prisma } from "@/lib/prisma";

const mockedFindUnique = prisma.link.findUnique as jest.Mock;
const mockedUpdate = prisma.link.update as jest.Mock;

beforeEach(() => {
  jest.clearAllMocks();
});

function makeContext(code: string) {
  return { params: Promise.resolve({ code }) };
}

describe("GET /[code] (redirect)", () => {
  it("returns 404 when the code does not exist", async () => {
    mockedFindUnique.mockResolvedValue(null);

    const res = await GET(
      new Request("http://localhost/missing"),
      makeContext("missing")
    );

    expect(res.status).toBe(404);
    expect(mockedUpdate).not.toHaveBeenCalled();
  });

  it("redirects to the original URL and increments the click count", async () => {
    mockedFindUnique.mockResolvedValue({
      code: "abc123",
      url: "https://example.com",
      clicks: 4,
    });
    mockedUpdate.mockResolvedValue({});

    const res = await GET(
      new Request("http://localhost/abc123"),
      makeContext("abc123")
    );

    expect(res.status).toBe(302);
    expect(res.headers.get("location")).toBe("https://example.com/");
    expect(mockedUpdate).toHaveBeenCalledWith({
      where: { code: "abc123" },
      data: { clicks: { increment: 1 }, lastClicked: expect.any(Date) },
    });
  });
});
