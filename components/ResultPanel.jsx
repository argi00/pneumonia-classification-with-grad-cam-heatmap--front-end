"use client";

import { cn, formatPct } from "@/lib/utils";

// ─── Icons ───────────────────────────────────────────────────────────────────

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function WarnIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
        clipRule="evenodd"
      />
    </svg>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function ResultBadge({ prediction, probability }) {
  const isPneumonia = prediction === "PNEUMONIE";
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2.5 px-4 py-2 rounded-xl font-semibold text-sm",
        isPneumonia
          ? "bg-rose-50 text-rose-700 border border-rose-200"
          : "bg-emerald-50 text-emerald-700 border border-emerald-200"
      )}
      role="status"
      aria-live="polite"
    >
      {isPneumonia ? <WarnIcon /> : <CheckIcon />}
      <span>{isPneumonia ? "Pneumonie detecté" : "Pas de pneumonie"}</span>
      <span
        className={cn(
          "text-xs font-bold px-2 py-0.5 rounded-full",
          isPneumonia ? "bg-rose-100 text-rose-600" : "bg-emerald-100 text-emerald-600"
        )}
      >
        {formatPct(probability, 0)}
      </span>
    </div>
  );
}

function ProbabilityBar({ prediction, probability }) {
  const pct = Math.round(probability * 100);
  const isPneumonia = prediction === "PNEUMONIE";

  return (
    <div className="space-y-1.5" aria-label={`Confidence: ${pct}%`}>
      <div className="flex justify-between text-xs font-medium text-slate-400">
        <span>Normale</span>
        <span>Pneumonie</span>
      </div>

      <div className="relative h-2.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={cn(
            "absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-out",
            isPneumonia ? "bg-rose-500" : "bg-emerald-500"
          )}
         style={{ width: `${pct}%` }} 
        />
        {/* 50% threshold line */}
        <div className="absolute inset-y-0 left-1/2 w-px bg-slate-300/80" />
      </div>

      <div className="flex justify-between text-xs text-slate-400">
        
        <span className="text-slate-300">Confidence 50%</span>
      
      </div>
    </div>
  );
}

function ImagePanel({ src, label, dotColor, caption }) {
  return (
    <figure className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <span className={cn("w-2 h-2 rounded-full shrink-0", dotColor)} aria-hidden="true" />
        <figcaption className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          {label}
        </figcaption>
      </div>

      <div className="aspect-square rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-sm">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={label}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {caption && (
        <p className="text-xs text-slate-400 text-center leading-relaxed px-2">{caption}</p>
      )}
    </figure>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

/**
 * @param {{
 *   result: {
 *     filename: string,
 *     prediction: "PNEUMONIA" | "NORMAL",
 *     probability: number,
 *     original_image: string,
 *     gradcam: string,
 *   }
 * }} props
 */
export default function ResultPanel({ result }) {
  const isPneumonia = result.prediction === "PNEUMONIA";

  return (
    <section
      className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-6 animate-fade-up"
      aria-label="Analysis result"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h3 className="font-bold text-slate-900 text-base">Résultat d'analyse</h3>
        <ResultBadge prediction={result.prediction} probability={result.probability} />
      </div>

      {/* Probability bar */}
      <ProbabilityBar prediction={result.prediction} probability={result.probability} />

      <hr className="border-slate-100" />

      {/* Visual explanation */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">
          Explication Visuel
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <ImagePanel
            src={`data:image/png;base64,${result.original_image}`}
            label="X-ray d'origine"
            dotColor="bg-slate-400"
            caption="Image d'origne"
          />
          <ImagePanel
            src={`data:image/png;base64,${result.gradcam}`}
            label="Grad-CAM avec heatmap"
            dotColor={isPneumonia ? "bg-rose-400" : "bg-emerald-400"}
            caption="Regions qui influencent les décisions du model"
          />
        </div>
      </div>

      {/* Metadata */}
      <dl className="bg-slate-50 rounded-xl px-4 py-3 flex flex-wrap gap-x-6 gap-y-1 text-xs text-slate-500">
        <div className="flex gap-1">
          <dt className="font-medium text-slate-700">File</dt>
          <dd className="truncate max-w-[160px]">{result.filename}</dd>
        </div>
        <div className="flex gap-1">
          <dt className="font-medium text-slate-700">Confidence</dt>
          <dd>{formatPct(result.probability, 2)}</dd>
        </div>
        <div className="flex gap-1">
          <dt className="font-medium text-slate-700">Model</dt>
          <dd>DenseNet-121</dd>
        </div>
      </dl>

      {/* Disclaimer */}
      <p className="text-xs text-slate-400 leading-relaxed border-t border-slate-100 pt-4">
  ⚠️ Cet outil est destiné uniquement à des
  <strong className="font-medium text-slate-500">
    {" "}fins de recherche
  </strong>.
  Les résultats ne doivent pas être utilisés comme substitut d'un diagnostic médical professionnel.
</p>
    </section>
  );
}
