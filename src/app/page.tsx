"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Link {
  id: string;
  code: string;
  url: string;
  clicks: number;
  createdAt: string;
}

export default function Home() {
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(false);

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";

  async function createLink() {
    if (!url) return alert("URL required!");
    setLoading(true);

    const res = await fetch("/api/links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, code }),
    });

    setLoading(false);

    if (!res.ok) {
      const err = await res.json();
      alert(err.message || "Error creating link");
      return;
    }

    setUrl("");
    setCode("");
    fetchLinks();
  }

  async function fetchLinks() {
    const res = await fetch("/api/links");
    const data = await res.json();
    setLinks(data);
  }

  async function deleteLink(code: string) {
    await fetch(`/api/links/${code}`, { method: "DELETE" });
    fetchLinks();
  }

  function copyText(text: string) {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  }

  useEffect(() => {
    fetchLinks();
  }, []);

  return (
    <main className="max-w-3xl mx-auto p-6 mt-20 space-y-6">
      <h1 className="text-2xl font-bold">TinyLink Dashboard</h1>

      {/* Form */}
      <div className="flex gap-2">
        <input
          className="border p-2 flex-1"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <input
          className="border p-2 w-32"
          placeholder="custom"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button
          className="bg-black text-white px-4 disabled:opacity-50"
          disabled={loading}
          onClick={createLink}
        >
          {loading ? "..." : "Shorten"}
        </button>
      </div>

      {/* Links Table */}
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Short Link</th>
            <th className="p-2 border">Clicks</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {links.map((l) => (
            <tr key={l.id}>
              <td className="p-2 border">
                <a
                  href={`${baseUrl}/${l.code}`}
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  {baseUrl}/{l.code}
                </a>
              </td>
              <td className="p-2 border text-center">{l.clicks}</td>
              <td className="p-4 border rounded-2xl text-center space-x-2">
                <button
                  className="px-4 py-1 bg-gray-200"
                  onClick={() => copyText(`${baseUrl}/${l.code}`)}
                >
                  Copy
                </button>
                <Link href={`/stats/${l.code}`} className="px-4 py-1 bg-blue-500 text-white">
                  Stats
                </Link>

                <button
                  className="px-4 py-1 bg-red-500 text-white"
                  onClick={() => deleteLink(l.code)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
