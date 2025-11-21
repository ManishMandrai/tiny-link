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
  const [status, setStatus] = useState<"loading" | "loaded" | "notfound">(
    "loading"
  );
  const [copied, setCopied] = useState(false);

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

  if (status === "loading")
    return (
      <main className="flex justify-center items-center h-[70vh]">
        <div className="animate-spin rounded-full h-18 w-18 border-t-3 border-black"></div>
      </main>
    );

  if (status === "notfound")
    return (
      <main className="p-6 text-center space-y-4">
        <h1 className="text-2xl font-bold text-red-600">Link Not Found</h1>
        <Link
          href="/"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Back to Dashboard
        </Link>
      </main>
    );

  if (!data) return null;

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  const shortUrl = `${baseUrl}/${data.code}`;

  const copyShortUrl = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="max-w-xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">
          Link Stats: <span className="text-blue-600">/{data.code}</span>
        </h1>
        <Link
          href="/"
          className="px-3 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 text-sm"
        >
          ← Back
        </Link>
      </div>

      <div className="p-5 border rounded-lg shadow-sm space-y-3 bg-white">
        <div>
          <strong>Short Link:</strong>
          <div className="flex items-center gap-2 mt-1">
            <a
              href={shortUrl}
              target="_blank"
              className="text-blue-600 underline break-all"
            >
              {shortUrl}
            </a>

            <button
              onClick={copyShortUrl}
              className={`flex items-center gap-1 px-3 py-1 text-xs rounded transition-all
              ${copied ? "bg-green-600" : "bg-blue-600 hover:bg-blue-700"} text-white`}
            >
              {copied ? "✓ Copied!" : "📋 Copy"}
            </button>
          </div>
        </div>

        <p className="truncate">
          <strong>Original:</strong>{" "}
          <span title={data.url}>{data.url}</span>
        </p>

        <p>
          <strong>Total Clicks:</strong>{" "}
          <span className="font-semibold text-blue-600">{data.clicks}</span>
        </p>

        <p>
          <strong>Created:</strong>{" "}
          {new Date(data.createdAt).toLocaleString()}
        </p>

        <p>
          <strong>Last Click:</strong>{" "}
          {data.lastClicked
            ? new Date(data.lastClicked).toLocaleString()
            : "Never"}
        </p>
      </div>
    </main>
  );
}
