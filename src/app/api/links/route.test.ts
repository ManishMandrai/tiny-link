jest.mock("@/lib/prisma", () => ({
  prisma: {
    link: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
  },
}));

import { POST, GET } from "./route";
import { prisma } from "@/lib/prisma";

const mockedCreate = prisma.link.create as jest.Mock;
const mockedFindMany = prisma.link.findMany as jest.Mock;

function makeRequest(body: unknown) {
  return new Request("http://localhost/api/links", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

beforeEach(() => {
  jest.clearAllMocks();
});

describe("POST /api/links", () => {
  it("400s on missing/invalid URL", async () => {
    const res = await POST(makeRequest({ url: "not-a-url" }));
    expect(res.status).toBe(400);
    expect(mockedCreate).not.toHaveBeenCalled();
  });

  it("400s on invalid custom code format", async () => {
    const res = await POST(
      makeRequest({ url: "https://example.com", code: "a" })
    );
    expect(res.status).toBe(400);
    expect(mockedCreate).not.toHaveBeenCalled();
  });

  it("creates a link with a generated code when none is provided", async () => {
    mockedCreate.mockResolvedValue({
      id: "1",
      url: "https://example.com",
      code: "abc123",
      clicks: 0,
    });

    const res = await POST(makeRequest({ url: "https://example.com" }));
    const body = await res.json();

    expect(res.status).toBe(201);
    expect(body.code).toBe("abc123");
    expect(mockedCreate).toHaveBeenCalledTimes(1);
  });

  it("returns 409 when the code already exists (Prisma P2002)", async () => {
    mockedCreate.mockRejectedValue({ code: "P2002" });

    const res = await POST(
      makeRequest({ url: "https://example.com", code: "taken1" })
    );

    expect(res.status).toBe(409);
  });

  it("returns 500 on unexpected errors", async () => {
    mockedCreate.mockRejectedValue(new Error("db down"));

    const res = await POST(makeRequest({ url: "https://example.com" }));

    expect(res.status).toBe(500);
  });
});

describe("GET /api/links", () => {
  it("returns the list of links ordered by createdAt desc", async () => {
    mockedFindMany.mockResolvedValue([{ id: "1", code: "abc123" }]);

    const res = await GET();
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body).toHaveLength(1);
    expect(mockedFindMany).toHaveBeenCalledWith({
      orderBy: { createdAt: "desc" },
    });
  });
});
