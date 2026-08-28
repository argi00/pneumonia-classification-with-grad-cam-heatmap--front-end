"use client";

import { useRef, useState, useCallback } from "react";
import { cn, formatBytes } from "@/lib/utils";

const ACCEPTED = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

function UploadIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className={className}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className="w-3.5 h-3.5"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

/**
 * @param {{
 *   onFile: (file: File) => void,
 *   preview: string | null,
 *   file: File | null,
 *   onClear: () => void,
 * }} props
 */
export default function DropZone({ onFile, preview, file, onClear }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState(null);

  const handleFile = useCallback(
    (f) => {
      if (!ACCEPTED.includes(f.type)) {
        setError("Unsupported format. Please upload a PNG, JPG, or WebP image.");
        return;
      }
      setError(null);
      onFile(f);
    },
    [onFile]
  );

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragging(false);
      const f = e.dataTransfer.files?.[0];
      if (f) handleFile(f);
    },
    [handleFile]
  );

  const handleChange = (e) => {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
    // Reset input so the same file can be re-selected after clearing
    e.target.value = "";
  };

  // ── Preview state ──────────────────────────────────────────────────────────
  if (preview && file) {
    return (
      <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 shadow-sm">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={preview}
          alt="Selected X-ray"
          className="w-full max-h-72 object-contain mx-auto block"
        />

        {/* File info bar */}
        <div className="absolute bottom-0 inset-x-0 bg-black/50 backdrop-blur-sm px-4 py-2 flex items-center justify-between">
          <div className="text-xs text-white/80 truncate max-w-[70%]">
            <span className="font-medium text-white">{file.name}</span>
            <span className="ml-2 text-white/60">{formatBytes(file.size)}</span>
          </div>
          <button
            onClick={onClear}
            className="flex items-center gap-1 text-xs text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full px-2.5 py-1"
            aria-label="Remove selected image"
          >
            <CloseIcon />
            Remove
          </button>
        </div>
      </div>
    );
  }

  // ── Drop zone ──────────────────────────────────────────────────────────────
  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={(e) => { e.preventDefault(); setDragging(false); }}
        onDrop={handleDrop}
        className={cn(
          "w-full rounded-2xl border-2 border-dashed transition-all duration-200",
          "flex flex-col items-center justify-center gap-4 py-16 px-6",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
          dragging
            ? "border-blue-400 bg-blue-50"
            : "border-slate-300 bg-slate-50/80 hover:border-slate-400 hover:bg-white"
        )}
        aria-label="Upload X-ray image"
      >
        <div
          className={cn(
            "p-4 rounded-2xl transition-colors",
            dragging ? "text-blue-500 bg-blue-100" : "text-slate-400 bg-white border border-slate-200"
          )}
        >
          <UploadIcon className="w-7 h-7" />
        </div>

        <div className="text-center">
          <p className="text-sm font-semibold text-slate-700">
            {dragging ? "Drop the image here" : "Drop an X-ray image here"}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            or{" "}
            <span className="text-blue-600 underline underline-offset-2 cursor-pointer">
                  Charger une image
            </span>
            {" "}· PNG, JPG, WebP
          </p>
        </div>
      </button>

      {error && (
        <p className="text-xs text-rose-600 text-center" role="alert">
          {error}
        </p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED.join(",")}
        onChange={handleChange}
        className="sr-only"
        aria-hidden="true"
      />
    </div>
  );
}
