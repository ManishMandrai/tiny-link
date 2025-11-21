"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface LinkData {
  code: string;
  url: string;
  clicks: number;
  createdAt: string;
  lastClicked: string | null;
}

export default function StatsPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const [data, setData] = useState<LinkData | null>(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    async function load() {
      const { code } = await params;

      const res = await fetch(`/api/links/${code}`);
      if (!res.ok) {
        setStatus("notfound");
        return;
      }

      const json = await res.json();
      setData(json);
      setStatus("loaded");
    }

    load();
  }, [params]);

  if (status === "loading") return <p className="p-6">Loading...</p>;
  if (status === "notfound")
    return (
      <main className="p-6">
        <h1 className="text-xl font-bold">Link Not Found</h1>
        <Link href="/" className="text-blue-600 underline">
          ← Back to Dashboard
        </Link>
      </main>
    );

  if (!data) return null;

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";

  return (
    <main className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Stats for /{data.code}</h1>

      <div className="p-4 border rounded space-y-2">
        <p>
          <strong>Short:</strong>{" "}
          <a
            className="text-blue-600 underline"
            href={`${baseUrl}/${data.code}`}
            target="_blank"
          >
            {baseUrl}/{data.code}
          </a>
        </p>
        <p>
          <strong>Original:</strong> {data.url}
        </p>
        <p>
          <strong>Clicks:</strong> {data.clicks}
        </p>
        <p>
          <strong>Created:</strong>{" "}
          {new Date(data.createdAt).toLocaleString()}
        </p>
        <p>
          <strong>Last Clicked:</strong>{" "}
          {data.lastClicked
            ? new Date(data.lastClicked).toLocaleString()
            : "Never"}
        </p>
      </div>

      <Link href="/" className="text-blue-600 underline">
        ← Back to Dashboard
      </Link>
    </main>
  );
}
