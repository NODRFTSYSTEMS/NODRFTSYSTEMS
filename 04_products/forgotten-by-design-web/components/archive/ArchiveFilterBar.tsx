"use client";

import { useState, useCallback } from "react";

interface FilterBarProps {
  topics: Array<{ _id: string; title: { en: string }; slug: { current: string } }>;
  formats: string[];
  onFilter: (filters: ArchiveFilters) => void;
}

export interface ArchiveFilters {
  search: string;
  topics: string[];
  format: string;
}

export function ArchiveFilterBar({ topics, formats, onFilter }: FilterBarProps) {
  const [search, setSearch] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedFormat, setSelectedFormat] = useState("");

  const emit = useCallback(
    (s: string, t: string[], f: string) => {
      onFilter({ search: s, topics: t, format: f });
    },
    [onFilter]
  );

  function handleSearch(val: string) {
    setSearch(val);
    emit(val, selectedTopics, selectedFormat);
  }

  function toggleTopic(slug: string) {
    const next = selectedTopics.includes(slug)
      ? selectedTopics.filter((t) => t !== slug)
      : [...selectedTopics, slug];
    setSelectedTopics(next);
    emit(search, next, selectedFormat);
  }

  function handleFormat(val: string) {
    const next = val === selectedFormat ? "" : val;
    setSelectedFormat(next);
    emit(search, selectedTopics, next);
  }

  function clearAll() {
    setSearch("");
    setSelectedTopics([]);
    setSelectedFormat("");
    emit("", [], "");
  }

  const hasFilters = search || selectedTopics.length || selectedFormat;

  return (
    <div className="mb-8 space-y-4">
      {/* Search */}
      <div className="relative">
        <input
          type="search"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search investigations, clips, documentation..."
          className="w-full bg-surface border border-border text-paper font-mono text-sm px-4 py-3 pl-10 placeholder:text-mist/50 focus:outline-none focus:border-accent/60"
        />
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 text-mist"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      </div>

      {/* Format filter */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="font-mono text-xs text-mist uppercase tracking-wider mr-2">Format:</span>
        {formats.map((f) => (
          <button
            key={f}
            onClick={() => handleFormat(f)}
            className={`font-mono text-xs uppercase tracking-wider px-3 py-1 border transition-colors ${
              selectedFormat === f
                ? "bg-accent border-accent text-paper"
                : "border-border text-mist hover:border-accent/50 hover:text-paper"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Topic filter chips */}
      {topics.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-mono text-xs text-mist uppercase tracking-wider mr-2">Topic:</span>
          {topics.map((topic) => (
            <button
              key={topic._id}
              onClick={() => toggleTopic(topic.slug.current)}
              className={`font-mono text-xs px-3 py-1 border transition-colors ${
                selectedTopics.includes(topic.slug.current)
                  ? "bg-accent border-accent text-paper"
                  : "border-border text-mist hover:border-accent/50 hover:text-paper"
              }`}
            >
              {topic.title.en}
            </button>
          ))}
        </div>
      )}

      {/* Clear */}
      {hasFilters && (
        <button
          onClick={clearAll}
          className="font-mono text-xs text-mist hover:text-paper transition-colors underline"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
