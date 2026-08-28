"use client";

import { useState, useCallback } from "react";
import { predict } from "@/lib/api";
import DropZone from "./DropZone";
import ResultPanel from "./ResultPanel";
import { cn } from "@/lib/utils";

function SpinnerIcon() {
  return (
    <svg
      className="w-4 h-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
        clipRule="evenodd"
      />
    </svg>
  );
}

// ─── Loading skeleton ─────────────────────────────────────────────────────────

function Skeleton() {
  return (
    <div
      className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-5"
      aria-busy="true"
      aria-label="Analyzing image…"
    >
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div className="h-4 w-28 bg-slate-100 rounded-lg animate-pulse" />
        <div className="h-8 w-44 bg-slate-100 rounded-xl animate-pulse" />
      </div>

      {/* Bar */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <div className="h-3 w-12 bg-slate-100 rounded animate-pulse" />
          <div className="h-3 w-16 bg-slate-100 rounded animate-pulse" />
        </div>
        <div className="h-2.5 bg-slate-100 rounded-full animate-pulse" />
        <div className="flex justify-between">
          <div className="h-3 w-8 bg-slate-100 rounded animate-pulse" />
          <div className="h-3 w-8 bg-slate-100 rounded animate-pulse" />
        </div>
      </div>

      <hr className="border-slate-100" />

      {/* Images */}
      <div className="grid grid-cols-2 gap-6">
        {[0, 1].map((i) => (
          <div key={i} className="space-y-2">
            <div className="h-3 w-24 bg-slate-100 rounded animate-pulse" />
            <div className="aspect-square rounded-2xl bg-slate-100 animate-pulse" />
            <div className="h-3 w-32 mx-auto bg-slate-100 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main orchestrator ────────────────────────────────────────────────────────

export default function PneumoniaDetector() {
  const [file, setFile]       = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult]   = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  const handleFile = useCallback((f) => {
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setResult(null);
    setError(null);
  }, []);

  const handleClear = useCallback(() => {
    if (preview) URL.revokeObjectURL(preview);
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
  }, [preview]);

  const handleAnalyze = async () => {
    if (!file || loading) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await predict(file);
      setResult(data);
    } catch (err) {
      setError(err.message || "An unexpected error occurred. Make sure the API is running.");
    } finally {
      setLoading(false);
    }
  };

  const canSubmit = !!file && !loading;

  return (
    <div className="space-y-5">
      {/* Upload card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
        <DropZone
          onFile={handleFile}
          preview={preview}
          file={file}
          onClear={handleClear}
        />

        {/* Error banner */}
        {error && (
          <div
            className="flex items-start gap-2.5 bg-rose-50 border border-rose-200 rounded-xl px-4 py-3"
            role="alert"
          >
            <span className="text-rose-500 mt-0.5">
              <AlertIcon />
            </span>
            <p className="text-sm text-rose-700 leading-relaxed">{error}</p>
          </div>
        )}

        {/* CTA button */}
        <button
          onClick={handleAnalyze}
          disabled={!canSubmit}
          className={cn(
            "w-full flex items-center justify-center gap-2.5 py-3 rounded-xl text-sm font-semibold",
            "transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
            canSubmit
              ? "bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white shadow-md shadow-blue-200"
              : "bg-slate-100 text-slate-400 cursor-not-allowed"
          )}
          aria-busy={loading}
        >
          {loading ? (
            <>
              <SpinnerIcon />
              Analyse en cours …
            </>
          ) : (
            "Analyze X-ray"
          )}
        </button>
      </div>

      {/* Results */}
      {loading && <Skeleton />}
      {!loading && result && <ResultPanel result={result} />}
    </div>
  );
}
