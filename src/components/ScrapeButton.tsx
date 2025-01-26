"use client";

import { api } from "~/trpc/react";

export function ScrapeButton() {
  const scrape = api.post.scrape.useMutation({
    onSuccess: () => {
      console.log("Scraping successful");
    },
    onError: (error) => {
      console.error("Scraping failed:", error);
    },
  });

  return (
    <button
      onClick={() => scrape.mutate()}
      disabled={scrape.isLoading}
      className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:bg-gray-400"
    >
      {scrape.isLoading ? "Scraping..." : "Scrape Data"}
    </button>
  );
}
